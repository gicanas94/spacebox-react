import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 95px;

  ${({ margin }) => margin && `
    margin: ${margin};
  `}
`;

const StyledLabel = styled.span`
  font-size: ${({ theme }) => theme.components.ColorInput.fontSize};
  margin-bottom: 7px;
  word-break: break-all;
`;

const StyledInput = styled.input`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  height: 60px;
  outline: none;
  padding: 0;
  width: 95px;

  &::-webkit-color-swatch {
    border: 0;
  }

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  ${({ rounded, theme }) => rounded && `
    border-radius: ${theme.global.borderRadius};
  `}
`;

const ColorInput = ({
  label,
  margin,
  rounded,
  ...props
}) => (
  <StyledWrapper margin={margin}>
    <StyledLabel>{label}</StyledLabel>
    <StyledInput rounded={rounded} type="color" {...props} />
  </StyledWrapper>
);

ColorInput.propTypes = {
  label: PropTypes.string.isRequired,
  margin: PropTypes.string,
  rounded: PropTypes.bool,
};

ColorInput.defaultProps = {
  margin: undefined,
  rounded: false,
};

export default ColorInput;
