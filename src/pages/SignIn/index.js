import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Box from '../../components/Box';
import Hr from '../../components/Hr';
import { ROUTES } from '../../constants';
import SignInForm from '../../forms/SignIn';
import SignInFacebookForm from '../../forms/SignInFacebook';
import SignInGoogleForm from '../../forms/SignInGoogle';
import SignInTwitterForm from '../../forms/SignInTwitter';

const StyledLink = styled(Link)`
  font-size: ${({ theme }) => theme.pages.SignIn.forgotPasswordLink.fontSize};
`;

const PasswordForgetLink = () => (
  <StyledLink to={ROUTES.PASSWORD_FORGET}>Forgot password?</StyledLink>
);

const SignInPage = ({ authUser }) => (
  authUser
    ? <Redirect to={ROUTES.HOME} />
    : (
      <Box size="small">
        <Helmet title="Sign in - Spacebox" />

        <h2>Welcome back!</h2>
        <SignInForm />
        <Hr margin="25px 0" />
        <SignInGoogleForm />
        <SignInFacebookForm />
        <SignInTwitterForm />
      </Box>
    )
);

SignInPage.propTypes = {
  authUser: PropTypes.objectOf(PropTypes.any),
};

SignInPage.defaultProps = {
  authUser: null,
};

const mapStateToProps = state => ({ authUser: state.session.authUser });

export { PasswordForgetLink };
export default connect(mapStateToProps)(SignInPage);
