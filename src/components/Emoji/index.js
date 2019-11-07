import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

const StyledSpan = styled.span`
  font-size: ${({ fontSize }) => fontSize};
`;

const Emoji = ({
  fontSize,
  label,
  symbol,
}) => {
  const intl = useIntl();
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
  label: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
};

Emoji.defaultProps = {
  fontSize: '0.91em',
};

export default Emoji;
