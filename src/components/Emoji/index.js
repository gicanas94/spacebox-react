import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span`
  font-size: ${props => props.fontSize};
`;

const Emoji = ({ label, fontSize, symbol }) => (
  <StyledSpan aria-label={label} role="img" fontSize={fontSize}>
    {symbol}
  </StyledSpan>
);

Emoji.propTypes = {
  label: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  symbol: PropTypes.string.isRequired,
};

Emoji.defaultProps = {
  fontSize: '0.91em',
};

export default Emoji;
