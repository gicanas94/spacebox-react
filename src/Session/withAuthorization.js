import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { ROUTES } from '../constants';
import { withFirebase } from '../Firebase';

const withAuthorization = condition => (Component) => {
  const WithAuthorization = ({
    authUser,
    firebase,
    history,
    ...props
  }) => {
    useEffect(() => {
      const listener = firebase.onAuthUserListener(
        () => {
          if (!condition(authUser)) {
            history.push(ROUTES.NOT_FOUND);
          }
        },
        () => history.push(ROUTES.SIGN_IN),
      );

      return () => listener();
    }, []);

    return condition(authUser)
      ? <Component authUser={authUser} {...props} />
      : null;
  };

  WithAuthorization.propTypes = {
    authUser: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
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
