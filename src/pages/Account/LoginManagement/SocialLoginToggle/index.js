import PropTypes from 'prop-types';
import React from 'react';

import Button from '../../../../components/Button';

const SocialLoginToggle = ({
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onLinkHandler,
  onUnlinkHandler,
}) => (isEnabled ? (
  <Button
    color="salmon"
    disabled={onlyOneLeft}
    onClick={() => onUnlinkHandler(signInMethod.id)}
    rounded
    styleType="bordered"
    type="button"
  >
    {`Unlink ${signInMethod.displayName}`}
  </Button>
) : (
  <Button
    color="green"
    onClick={() => onLinkHandler(signInMethod.provider)}
    rounded
    styleType="bordered"
    type="button"
  >
    {`Link ${signInMethod.displayName}`}
  </Button>
));

SocialLoginToggle.propTypes = {
  isEnabled: PropTypes.bool.isRequired,
  onLinkHandler: PropTypes.func.isRequired,
  onlyOneLeft: PropTypes.bool.isRequired,
  onUnlinkHandler: PropTypes.func.isRequired,
  signInMethod: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default SocialLoginToggle;
