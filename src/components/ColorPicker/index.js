import PropTypes from 'prop-types';
import React from 'react';
import { SliderPicker } from 'react-color';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  border: ${({ theme }) => theme.components.ColorPicker.border};
  background-color: ${({ theme }) => theme.components.ColorPicker.bgColor};
  display: flex;
  flex-direction: column;
  padding: 15px;
  width: 100%;

  ${({ margin }) => margin && `
    margin: ${margin};
  `}
`;

const StyledLabel = styled.span`
  font-size: ${({ theme }) => theme.components.ColorPicker.fontSize};
  font-weight: ${({ theme }) => theme.components.ColorPicker.fontWeight};
  margin-bottom: 15px;
  word-break: break-all;
`;

const ColorPicker = ({
  color,
  disabled,
  label,
  margin,
  onChangeHandler,
}) => (
  <StyledWrapper margin={margin}>
    <StyledLabel>{label}</StyledLabel>
    <SliderPicker color={color} onChange={!disabled && onChangeHandler} />
  </StyledWrapper>
);

ColorPicker.propTypes = {
  color: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  margin: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired,
};

ColorPicker.defaultProps = {
  disabled: false,
  margin: undefined,
};

export default ColorPicker;
