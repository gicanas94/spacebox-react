import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import useStateWithCallback from 'use-state-with-callback';

import Button from '../../../../components/Button';
import PasswordLinkForm from '../../../../forms/PasswordLink';

const StyledPasswordLinkFormWrapper = styled.div`
  padding-top: 25px !important;
  width: 100%;
`;

const PasswordLoginToggle = ({
  alertSetAction,
  authUserEmail,
  firebase,
  getSignInMethodsHandler,
  isEnabled,
  isLoading,
  isLoadingSetAction,
  onlyOneLeft,
  signInMethod,
  unlinkHandler,
}) => {
  const [
    passwordLinkFormIsVisible,
    setPasswordLinkFormIsVisible,
  ] = useStateWithCallback(false, () => {
    if (passwordLinkFormIsVisible) {
      document.getElementById('input-component_passwordOne').focus();
    }
  });

  return (
    <>
      {isEnabled ? (
        <Button
          color="salmon"
          disabled={onlyOneLeft || isLoading}
          onClick={() => unlinkHandler(signInMethod.id)}
          size="small"
          styleType="unbordered"
        >
          {isLoading
            ? 'pages.account.loginManagement.buttons.loading'
            : 'pages.account.loginManagement.buttons.unlink'}
        </Button>
      ) : (
        <Button
          color="green"
          disabled={isLoading}
          onClick={() => setPasswordLinkFormIsVisible(true)}
          size="small"
          styleType="bordered"
          type="button"
        >
          {isLoading
            ? 'pages.account.loginManagement.buttons.loading'
            : 'pages.account.loginManagement.buttons.link'}
        </Button>
      )}

      {passwordLinkFormIsVisible && (
        <StyledPasswordLinkFormWrapper>
          <PasswordLinkForm
            alertSetAction={alertSetAction}
            authUserEmail={authUserEmail}
            firebase={firebase}
            getSignInMethodsHandler={getSignInMethodsHandler}
            isLoadingSetAction={isLoadingSetAction}
            setPasswordLinkFormIsVisibleHandler={setPasswordLinkFormIsVisible}
          />
        </StyledPasswordLinkFormWrapper>
      )}
    </>
  );
};

PasswordLoginToggle.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUserEmail: PropTypes.string.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  getSignInMethodsHandler: PropTypes.func.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoadingSetAction: PropTypes.func.isRequired,
  onlyOneLeft: PropTypes.bool.isRequired,
  signInMethod: PropTypes.objectOf(PropTypes.any).isRequired,
  unlinkHandler: PropTypes.func.isRequired,
};

export default PasswordLoginToggle;
