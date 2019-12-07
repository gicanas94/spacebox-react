import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';

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
  const WithEmailVerification = ({ authUser, ...props }) => (
    needsEmailVerification(authUser)
      ? <Redirect to={ROUTES.VERIFY_EMAIL} />
      : <Component {...props} />
  );

  WithEmailVerification.propTypes = {
    authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
    firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  const mapStateToProps = state => ({ authUser: state.authUser });

  return compose(
    connect(mapStateToProps),
    withFirebase,
  )(WithEmailVerification);
};

export default withEmailVerification;
