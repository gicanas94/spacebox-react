import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Transition } from 'react-spring/renderprops';

import AccountPage from './pages/Account';
import AdminPage from './pages/Admin';
import Alert from './components/Alert';
import { alertReset, confirmationModalClose } from './Redux/actions';
import ConfirmationModal from './components/ConfirmationModal';
import CreateSpaceboxPage from './pages/CreateSpacebox';
import { device } from './styles';
import EditSpaceboxPage from './pages/EditSpacebox';
import FaqPage from './pages/Faq';
import Header from './components/Header';
import HomePage from './pages/Home';
import LoadingScreen from './components/LoadingScreen';
import NotFoundPage from './pages/NotFound';
import PasswordForgetPage from './pages/PasswordForget';
import { ROUTES } from './constants';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import SpacePage from './pages/Space';
import PostPage from './pages/Post';
import TestPage from './pages/Test';
import UserPage from './pages/User';
import VerifyEmailPage from './pages/VerifyEmail';
import { withAuthentication } from './Session';

const StyledRoutesContainer = styled.div`
  margin: auto;
  max-width: ${({ theme }) => theme.components.app.maxWidth};
  padding: 10px;
  width: ${({ theme }) => theme.components.app.mobileWidth};

  @media ${device.laptop} {
    padding: 20px 0;
    width: ${({ theme }) => theme.components.app.laptopWidth};
  }
`;

const App = ({
  alert,
  alertResetAction,
  confirmationModal,
  confirmationModalCloseAction,
  isLoading,
}) => (
  <Fragment>
    <div id="page-content">
      <Header />

      <StyledRoutesContainer>
        <Switch>
          <Route component={AccountPage} path={ROUTES.ACCOUNT_BASE} />
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

          {process.env.ENV !== 'production' && (
            <Route component={TestPage} exact path={ROUTES.TEST} />
          )}

          <Route component={UserPage} path={ROUTES.USER_WITH_SLUG} />
          <Route component={VerifyEmailPage} path={ROUTES.VERIFY_EMAIL} />
          <Route component={NotFoundPage} />
        </Switch>
      </StyledRoutesContainer>
    </div>

    <Transition
      items={alert}
      from={{ marginTop: '-70px' }}
      enter={{ marginTop: '0' }}
      leave={{ marginTop: '-70px' }}
      config={{ mass: 1, tension: 600, friction: 42 }}
    >
      {activeAlert => activeAlert && (transitionProps => (
        <Alert
          message={activeAlert.message}
          onAlertCloseHandler={() => alertResetAction(null)}
          style={transitionProps}
          type={activeAlert.type}
        />
      ))}
    </Transition>

    <Transition
      items={isLoading}
      from={{ opacity: 1 }}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0 }}
      config={{ duration: 100 }}
    >
      {loading => loading && (transitionProps => (
        <LoadingScreen style={transitionProps} />
      ))}
    </Transition>

    <Transition
      items={confirmationModal}
      from={{ opacity: 1 }}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0 }}
      config={{ duration: 100 }}
    >
      {modalContent => modalContent && (transitionProps => (
        <ConfirmationModal
          buttonsContent={modalContent.buttonsContent}
          content={modalContent.content}
          onCloseHandler={() => confirmationModalCloseAction()}
          onConfirmHandler={() => modalContent.onConfirmHandler()}
          style={transitionProps}
          title={modalContent.title}
        />
      ))}
    </Transition>
  </Fragment>
);

App.propTypes = {
  alert: PropTypes.objectOf(PropTypes.any),
  alertResetAction: PropTypes.func.isRequired,
  confirmationModal: PropTypes.objectOf(PropTypes.any),
  confirmationModalCloseAction: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

App.defaultProps = {
  alert: null,
  confirmationModal: null,
};

const mapStateToProps = state => ({
  alert: state.alert,
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
