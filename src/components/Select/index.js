import { KeyboardArrowDown } from 'styled-icons/material/KeyboardArrowDown';
import { ErrorOutline } from 'styled-icons/material/ErrorOutline';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { keyframe, transition } from '../../styles';

const StyledLabel = styled.label`
  color: ${props => props.theme.components.Input.color.default};
  font-size: ${props => props.theme.components.Input.label.fontSize};
  font-weight: ${props => props.theme.components.Input.label.fontWeight};
  overflow: hidden;
  padding-bottom: 2px;
  text-overflow: ellipsis;
  transition: color ${transition.speed.superfast} linear;
  white-space: nowrap;

  ${props => props.disabled && `
    color: ${props.theme.components.Input.color.disabled} !important;
  `}
`;

const StyledSelect = styled.select`
  appearance: none;
  background-color: transparent;
  border: 0;
  border-color: ${props => props.theme.components.Input.color.default};
  border-style: solid;
  border-width: ${props => props.theme.components.Input.borderWidth};
  cursor: pointer;
  padding: 0 10px;
  padding-top: 5px;
  height: 45px;
  transition: border ${transition.speed.superfast} linear;
  width: 100%;

  &:focus {
    outline: none;
  }

  ${props => props.disabled && `
    border-color: ${props.theme.components.Input.color.disabled} !important;
  `}

  ${props => props.rounded && `
    border-radius: ${props.theme.global.borderRadius};
  `}
`;

const StyledOption = styled.option``;

const StyledKeyboardArrowDownIcon = styled(KeyboardArrowDown)`
  position: absolute;
  right: 10px;
  top: 35%;
  width: 30px;
`;

const StyledErrorIcon = styled(ErrorOutline)`
  animation: ${transition.speed.normal} infinite ${keyframe.beat(1.1)};
  color: ${props => props.theme.components.Input.color.error};
  position: absolute;
  right: 40px;
  top: 35%;
  width: 30px;
`;

const StyledErrorMessage = styled.div`
  color: ${props => props.theme.components.Input.color.error};
  font-size: ${props => props.theme.components.Input.errorMessage.fontSize};
  font-weight: ${props => (
    props.theme.components.Input.errorMessage.fontWeight
  )};
  overflow: hidden;
  padding-top: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 92px;
  justify-content: flex-start;
  position: relative;

  ${props => props.error && `
    ${StyledLabel} {
      color: ${props.theme.components.Input.color.error};
    }

    ${StyledSelect} {
      border-color: ${props.theme.components.Input.color.error};
      padding-right: 40px;
    }
  `}

  ${props => props.margin && `
    margin: ${props.margin};
  `}

  ${props => props.success && `
    ${StyledLabel} {
      color: ${props.theme.components.Input.color.success};
    }

    ${StyledSelect} {
      border-color: ${props.theme.components.Input.color.success};
    }
  `}
`;

const Select = ({
  disabled,
  error,
  name,
  label,
  margin,
  options,
  success,
  ...props
}) => (
  <StyledWrapper error={error} margin={margin} success={success}>
    <StyledLabel disabled={disabled} htmlFor={name}>{label}</StyledLabel>

    <StyledSelect disabled={disabled} id={name} {...props}>
      <StyledOption value="">-</StyledOption>

      {options.map(value => (
        <StyledOption key={value} value={value}>{value}</StyledOption>
      ))}
    </StyledSelect>

    {!disabled && <StyledKeyboardArrowDownIcon />}
    {!disabled && error && <StyledErrorIcon />}
    {!disabled && error && <StyledErrorMessage>{error}</StyledErrorMessage>}
  </StyledWrapper>
);

Select.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  margin: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  rounded: PropTypes.bool,
  success: PropTypes.bool,
};

Select.defaultProps = {
  disabled: false,
  error: undefined,
  margin: undefined,
  rounded: false,
  success: false,
};

export default Select;