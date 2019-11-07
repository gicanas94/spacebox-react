import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span`
  font-size: ${({ fontSize }) => fontSize};
`;

const Emoji = ({
  fontSize,
  intl,
  label,
  symbol,
}) => {
  const ariaLabel = intl.formatMessage({ id: label });
  const iconWord = intl.formatMessage({ id: 'components.emoji.labelSuffix' });

  return (
    <StyledSpan
      aria-label={`${ariaLabel} ${iconWord}`}
      role="img"
      fontSize={fontSize}
    >
      {symbol}
    </StyledSpan>
  );
};

Emoji.propTypes = {
  fontSize: PropTypes.string,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  label: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
};

Emoji.defaultProps = {
  fontSize: '0.91em',
};

export default injectIntl(Emoji);
