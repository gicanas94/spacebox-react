import PropTypes from 'prop-types';
import React from 'react';

import Button from '../../../../components/Button';

const SocialLoginToggle = ({
  isEnabled,
  isLoading,
  onLinkHandler,
  onlyOneLeft,
  onUnlinkHandler,
  signInMethod,
}) => (isEnabled ? (
  <Button
    color="salmon"
    disabled={onlyOneLeft || isLoading}
    onClick={() => onUnlinkHandler(signInMethod.id)}
    rounded
    size="small"
    styleType="filled"
    type="button"
    width="90px"
  >
    {isLoading ? '...' : 'Unlink'}
  </Button>
) : (
  <Button
    color="green"
    disabled={isLoading}
    onClick={() => onLinkHandler(signInMethod.provider)}
    rounded
    size="small"
    styleType="filled"
    type="button"
    width="90px"
  >
    {isLoading ? '...' : 'Link'}
  </Button>
));

SocialLoginToggle.propTypes = {
  isEnabled: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  onLinkHandler: PropTypes.func.isRequired,
  onlyOneLeft: PropTypes.bool.isRequired,
  onUnlinkHandler: PropTypes.func.isRequired,
  signInMethod: PropTypes.objectOf(PropTypes.any).isRequired,
};

SocialLoginToggle.defaultProps = {
  isLoading: false,
};

export default SocialLoginToggle;
