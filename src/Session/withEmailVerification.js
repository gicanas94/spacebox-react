import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { ROUTES } from '../constants';
import { withFirebase } from '../Firebase';

const needsEmailVerification = authUser => (
  authUser
  && !authUser.emailVerified
  && authUser.providerData
    .map(provider => provider.providerId)
    .includes('password')
);

const withEmailVerification = (Component) => {
  const WithEmailVerification = ({ authUser, history, ...props }) => (
    needsEmailVerification(authUser)
      ? history.push(ROUTES.VERIFY_EMAIL)
      : <Component {...props} />
  );

  WithEmailVerification.propTypes = {
    authUser: PropTypes.objectOf(PropTypes.any),
    firebase: PropTypes.objectOf(PropTypes.any).isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  WithEmailVerification.defaultProps = {
    authUser: null,
  };

  const mapStateToProps = state => ({ authUser: state.session.authUser });

  return compose(
    connect(mapStateToProps),
    withFirebase,
    withRouter,
  )(WithEmailVerification);
};

export default withEmailVerification;
