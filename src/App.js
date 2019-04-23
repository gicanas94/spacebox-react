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
import { cambalache, device } from './styles';
import CreateSpaceboxPage from './pages/CreateSpacebox';
import FaqPage from './pages/Faq';
import Header from './components/Header';
import HomePage from './pages/Home';
import PasswordForgetPage from './pages/PasswordForget';
import { ROUTES } from './constants';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import VerifyEmailPage from './pages/VerifyEmail';
import { withAuthentication } from './Session';

const StyledRoutesContainer = styled.div`
  margin: auto;
  padding: 10px;
  width: ${cambalache.maxWidth.mobile};

  @media ${device.laptop} {
    padding: 20px 0;
    width: ${cambalache.maxWidth.laptop};
  }
`;

const App = ({ alertState, alertSetAction }) => (
  <Fragment>
    <Header />

    {alertState && alertState.alert && (
      <Alert
        onAlertCloseHandler={() => alertSetAction(null)}
        text={alertState.alert.text}
        type={alertState.alert.type}
      />
    )}

    <StyledRoutesContainer>
      <Switch>
        <Route component={AccountPage} path={ROUTES.ACCOUNT} />
        <Route component={AdminPage} path={ROUTES.ADMIN} />
        <Route component={CreateSpaceboxPage} path={ROUTES.CREATE_SPACEBOX} />
        <Route component={FaqPage} path={ROUTES.FAQ} />
        <Route component={HomePage} exact path={ROUTES.HOME} />
        <Route component={PasswordForgetPage} path={ROUTES.PASSWORD_FORGET} />
        <Route component={SignInPage} path={ROUTES.SIGN_IN} />
        <Route component={SignUpPage} path={ROUTES.SIGN_UP} />
        <Route component={VerifyEmailPage} path={ROUTES.VERIFY_EMAIL} />
      </Switch>
    </StyledRoutesContainer>
  </Fragment>
);

App.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  alertState: PropTypes.objectOf(PropTypes.any),
};

App.defaultProps = {
  alertState: null,
};

const mapStateToProps = state => ({ alertState: state.alert });

const mapDispatchToProps = { alertSetAction: alertSet };

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthentication,
)(App);
