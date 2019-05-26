import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { ROUTES } from '../constants';
import { withFirebase } from '../Firebase';

const withAuthorization = condition => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      const { firebase, history } = this.props;

      this.listener = firebase.onAuthUserListener(
        (authUser) => {
          if (!condition(authUser)) {
            history.push(ROUTES.NOT_FOUND);
          }
        },
        () => history.push(ROUTES.SIGN_IN),
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      const { authUser } = this.props;

      return condition(authUser) ? (
        <Component {...this.props} />
      ) : null;
    }
  }

  WithAuthorization.propTypes = {
    authUser: PropTypes.objectOf(PropTypes.any),
    firebase: PropTypes.objectOf(PropTypes.any).isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  WithAuthorization.defaultProps = {
    authUser: null,
  };

  const mapStateToProps = state => ({ authUser: state.session.authUser });

  return compose(
    connect(mapStateToProps),
    withFirebase,
    withRouter,
  )(WithAuthorization);
};

export default withAuthorization;
