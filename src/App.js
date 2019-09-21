import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import AccountPage from './pages/Account';
import AdminPage from './pages/Admin';
import Alert from './components/Alert';
import { alertSet } from './Redux/actions';
import CreateSpaceboxPage from './pages/CreateSpacebox';
import { device } from './styles';
import EditSpaceboxPage from './pages/EditSpacebox';
import FaqPage from './pages/Faq';
import Header from './components/Header';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';
import PasswordForgetPage from './pages/PasswordForget';
import { ROUTES } from './constants';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import SpacePage from './pages/Space';
import PostPage from './pages/Post';
import UserPage from './pages/User';
import VerifyEmailPage from './pages/VerifyEmail';
import { withAuthentication } from './Session';

const StyledRoutesContainer = styled.div`
  margin: auto;
  max-width: ${({ theme }) => theme.components.App.maxWidth};
  padding: 10px;
  width: ${({ theme }) => theme.components.App.mobileWidth};

  @media ${device.laptop} {
    padding: 20px 0;
    width: ${({ theme }) => theme.components.App.laptopWidth};
  }
`;

const App = ({ activeAlert, alertSetAction }) => (
  <Fragment>
    <Header />

    {activeAlert && (
      <Alert
        onAlertCloseHandler={() => alertSetAction(null)}
        text={activeAlert.text}
        type={activeAlert.type}
      />
    )}

    <StyledRoutesContainer>
      <Switch>
        <Route component={AccountPage} path={ROUTES.ACCOUNT} />
        <Route component={AdminPage} path={ROUTES.ADMIN} />
        <Route component={CreateSpaceboxPage} path={ROUTES.CREATE_SPACEBOX} />
        <Route component={EditSpaceboxPage} path={ROUTES.EDIT_SPACEBOX_WITH_SLUG} />
        <Route component={FaqPage} path={ROUTES.FAQ} />
        <Route component={HomePage} exact path={ROUTES.HOME} />
        <Route component={NotFoundPage} exact path={ROUTES.NOT_FOUND} />
        <Route component={PasswordForgetPage} path={ROUTES.PASSWORD_FORGET} />
        <Route component={SignInPage} path={ROUTES.SIGN_IN} />
        <Route component={SignUpPage} path={ROUTES.SIGN_UP} />
        <Route component={SpacePage} exact path={ROUTES.SPACE_WITH_SLUG} />
        <Route component={PostPage} exact path={ROUTES.SPACE_POST} />
        <Route component={UserPage} path={ROUTES.USER_WITH_SLUG} />
        <Route component={VerifyEmailPage} path={ROUTES.VERIFY_EMAIL} />
        <Route component={NotFoundPage} />
      </Switch>
    </StyledRoutesContainer>
  </Fragment>
);

App.propTypes = {
  activeAlert: PropTypes.objectOf(PropTypes.string),
  alertSetAction: PropTypes.func.isRequired,
};

App.defaultProps = {
  activeAlert: null,
};

const mapStateToProps = state => ({ activeAlert: state.activeAlert });

const mapDispatchToProps = { alertSetAction: alertSet };

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthentication,
)(App);
