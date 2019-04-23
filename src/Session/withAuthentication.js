import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { authUserSet } from '../Redux/actions';
import { withFirebase } from '../Firebase';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      const { authUserSetAction, firebase } = this.props;

      this.listener = firebase.onAuthUserListener(
        (authUser) => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          authUserSetAction(authUser);
        },
        () => {
          localStorage.removeItem('authUser');
          authUserSetAction(null);
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  WithAuthentication.propTypes = {
    authUserSetAction: PropTypes.func.isRequired,
    firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  const mapDispatchToProps = {
    authUserSetAction: authUserSet,
  };

  return compose(
    connect(null, mapDispatchToProps),
    withFirebase,
  )(WithAuthentication);
};

export default withAuthentication;
