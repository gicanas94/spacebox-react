import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import useStateWithCallback from 'use-state-with-callback';

import Button from '../../../../components/Button';
import PasswordLinkForm from '../../../../forms/PasswordLink';

const PasswordLoginToggle = ({
  alertSetAction,
  authUserEmail,
  fetchSignInMethodsHandler,
  firebase,
  isEnabled,
  isLoading,
  onlyOneLeft,
  onUnlinkHandler,
  signInMethod,
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
    <Fragment>
      {isEnabled ? (
        <Button
          color="salmon"
          disabled={onlyOneLeft || isLoading}
          onClick={() => onUnlinkHandler(signInMethod.id)}
          rounded
          size="small"
          styleType="filled"
        >
          {isLoading
            ? 'pages.account.loginManagement.buttons.loading'
            : 'pages.account.loginManagement.buttons.unlink'
          }
        </Button>
      ) : (
        <Button
          color="green"
          disabled={isLoading}
          onClick={() => setPasswordLinkFormIsVisible(true)}
          rounded
          size="small"
          styleType="filled"
          type="button"
        >
          {isLoading
            ? 'pages.account.loginManagement.buttons.loading'
            : 'pages.account.loginManagement.buttons.link'
          }
        </Button>
      )}

      {passwordLinkFormIsVisible && (
        <PasswordLinkForm
          alertSetAction={alertSetAction}
          authUserEmail={authUserEmail}
          fetchSignInMethodsHandler={fetchSignInMethodsHandler}
          firebase={firebase}
          page="loginManagement"
          setPasswordLinkFormIsVisibleHandler={setPasswordLinkFormIsVisible}
        />
      )}
    </Fragment>
  );
};

PasswordLoginToggle.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUserEmail: PropTypes.string.isRequired,
  fetchSignInMethodsHandler: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  isEnabled: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  onlyOneLeft: PropTypes.bool.isRequired,
  onUnlinkHandler: PropTypes.func.isRequired,
  signInMethod: PropTypes.objectOf(PropTypes.any).isRequired,
};

PasswordLoginToggle.defaultProps = {
  isLoading: false,
};

export default PasswordLoginToggle;
