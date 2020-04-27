import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';

import { ROUTES } from '../constants';

const needsEmailVerification = (authUser) => (
  authUser
  && !authUser.emailVerified
  && authUser.providerData
    .map((provider) => provider.providerId)
    .includes('password')
);

const withEmailVerification = (Component) => {
  const WithEmailVerification = ({ authUser, ...props }) => (
    needsEmailVerification(authUser)
      ? <Redirect to={ROUTES.VERIFY_EMAIL} />
      : <Component authUser={authUser} {...props} />
  );

  WithEmailVerification.propTypes = {
    authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
  };

  const mapStateToProps = (state) => ({ authUser: state.authUser });

  return connect(mapStateToProps)(WithEmailVerification);
};

export default withEmailVerification;
