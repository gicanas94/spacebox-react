import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Box from '../../components/Box';
import { ROUTES } from '../../constants';
import SignUpForm from '../../forms/SignUp';

const StyledLink = styled(Link)`
  font-size: ${({ theme }) => theme.pages.SignUp.signInLink.fontSize};
`;

const SignInLink = () => (
  <StyledLink to={ROUTES.SIGN_IN}>Sign in instead?</StyledLink>
);

const SignUpPage = ({ authUser }) => (
  authUser
    ? <Redirect to={ROUTES.HOME} />
    : (
      <Box size="medium">
        <Helmet title="Sign up - Spacebox" />
        <h1>Good choice.</h1>
        <SignUpForm />
      </Box>
    )
);

SignUpPage.propTypes = {
  authUser: PropTypes.objectOf(PropTypes.any),
};

SignUpPage.defaultProps = {
  authUser: null,
};

const mapStateToProps = state => ({ authUser: state.session.authUser });

export { SignInLink };
export default connect(mapStateToProps)(SignUpPage);
