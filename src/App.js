import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Transition } from 'react-spring/renderprops';

import AccountPage from './pages/Account';
import AdminPage from './pages/Admin';
import Alert from './components/Alert';
import { alertReset, confirmationModalClose } from './redux/actions';
import ConfirmationModal from './components/ConfirmationModal';
import CreateSpaceboxPage from './pages/CreateSpacebox';
import { devices, transitionProps } from './styles';
import EditSpaceboxPage from './pages/EditSpacebox';
import FaqPage from './pages/Faq';
import GlobalMessaging from './components/GlobalMessaging';
import Header from './components/Header';
import HomePage from './pages/Home';
import LoadingScreen from './components/LoadingScreen';
import NotFoundPage from './pages/NotFound';
import PasswordForgetPage from './pages/PasswordForget';
import { ROUTES } from './constants';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import SpacePage from './pages/Space';
import TestPage from './pages/Test';
import UserPage from './pages/User';
import VerifyEmailPage from './pages/VerifyEmail';
import { withAuthentication } from './session';

const StyledRoutesContainer = styled.div`
  margin: auto;
  max-width: ${({ theme }) => theme.components.app.maxWidth};
  padding: 10px;
  width: ${({ theme }) => theme.components.app.mobileWidth};

  @media ${devices.laptop} {
    padding: 20px 0;
    width: ${({ theme }) => theme.components.app.laptopWidth};
  }
`;

const App = ({
  alert,
  alertResetAction,
  appLocale,
  confirmationModal,
  confirmationModalCloseAction,
  isLoading,
}) => (
  <>
    <div id="page-content">
      <Header />

      <StyledRoutesContainer>
        <GlobalMessaging appLocale={appLocale} />

        <Switch>
          <Route component={AccountPage} path={ROUTES.ACCOUNT_BASE} />
          <Route component={AdminPage} path={ROUTES.ADMIN} />
          <Route component={CreateSpaceboxPage} path={ROUTES.CREATE_SPACEBOX} />
          <Route component={EditSpaceboxPage} path={ROUTES.EDIT_SPACEBOX} />
          <Route component={FaqPage} path={ROUTES.FAQ} />
          <Route component={HomePage} exact path={ROUTES.HOME} />
          <Route component={NotFoundPage} exact path={ROUTES.NOT_FOUND} />
          <Route component={PasswordForgetPage} path={ROUTES.PASSWORD_FORGET} />
          <Route component={SignInPage} path={ROUTES.SIGN_IN} />
          <Route component={SignUpPage} path={ROUTES.SIGN_UP} />
          <Route component={SpacePage} exact path={ROUTES.SPACE} />
          <Route component={TestPage} exact path={ROUTES.TEST} />
          <Route component={UserPage} path={ROUTES.USER} />
          <Route component={VerifyEmailPage} path={ROUTES.VERIFY_EMAIL} />
          <Route component={NotFoundPage} />
        </Switch>
      </StyledRoutesContainer>
    </div>

    <Transition items={alert} {...transitionProps.components.alert}>
      {(activeAlert) =>
        activeAlert &&
        ((styleProps) => (
          <Alert
            message={activeAlert.message}
            onAlertCloseHandler={() => alertResetAction(null)}
            style={styleProps}
            type={activeAlert.type}
          />
        ))
      }
    </Transition>

    <Transition items={isLoading} {...transitionProps.components.loadingScreen}>
      {(loading) =>
        loading && ((styleProps) => <LoadingScreen style={styleProps} />)
      }
    </Transition>

    <Transition
      items={confirmationModal}
      {...transitionProps.components.confirmationModal}
    >
      {(modalContent) =>
        modalContent &&
        ((styleProps) => (
          <ConfirmationModal
            buttonsContent={modalContent.buttonsContent}
            content={modalContent.content}
            onCloseHandler={() => confirmationModalCloseAction()}
            onConfirmHandler={() => modalContent.onConfirmHandler()}
            style={styleProps}
            title={modalContent.title}
          />
        ))
      }
    </Transition>
  </>
);

App.propTypes = {
  alert: PropTypes.objectOf(PropTypes.any),
  alertResetAction: PropTypes.func.isRequired,
  appLocale: PropTypes.string.isRequired,
  confirmationModal: PropTypes.objectOf(PropTypes.any),
  confirmationModalCloseAction: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

App.defaultProps = {
  alert: null,
  confirmationModal: null,
};

const mapStateToProps = (state) => ({
  alert: state.alert,
  appLocale: state.appLocale,
  confirmationModal: state.confirmationModal,
  isLoading: state.isLoading,
});

const mapDispatchToProps = {
  alertResetAction: alertReset,
  confirmationModalCloseAction: confirmationModalClose,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthentication,
)(App);
