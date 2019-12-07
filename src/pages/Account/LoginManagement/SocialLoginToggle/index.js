import PropTypes from 'prop-types';
import React from 'react';

import Button from '../../../../components/Button';

const SocialLoginToggle = ({
  isEnabled,
  isLoading,
  linkHandler,
  onlyOneLeft,
  signInMethod,
  unlinkHandler,
}) => (isEnabled ? (
  <Button
    color="salmon"
    disabled={onlyOneLeft || isLoading}
    onClick={() => unlinkHandler(signInMethod.id)}
    rounded
    size="small"
    styleType="unbordered"
    type="button"
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
    onClick={() => linkHandler(signInMethod.provider)}
    rounded
    size="small"
    styleType="bordered"
    type="button"
  >
    {isLoading
      ? 'pages.account.loginManagement.buttons.loading'
      : 'pages.account.loginManagement.buttons.link'
    }
  </Button>
));

SocialLoginToggle.propTypes = {
  isEnabled: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  linkHandler: PropTypes.func.isRequired,
  onlyOneLeft: PropTypes.bool.isRequired,
  signInMethod: PropTypes.objectOf(PropTypes.any).isRequired,
  unlinkHandler: PropTypes.func.isRequired,
};

export default SocialLoginToggle;
