import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledCheckbox = styled.span`
  background-color: transparent;
  border-color: ${props => props.theme.components.Checkbox.color.unchecked};
  border-style: solid;
  border-width: ${props => props.theme.components.Checkbox.borderWidth};
  display: flex;
  height: 25px;
  justify-content: center;
  margin-right: 7px;
  width: 25px;

  ${props => props.checked && `
    border-color: ${props.theme.components.Checkbox.color.checked};
    color: ${props.theme.components.Checkbox.color.checked};

    &:after {
      content: '✔';
      font-size: ${props.theme.components.Checkbox.fontSize};
    }
  `}

  ${props => props.rounded && `
    border-radius: ${props.theme.global.borderRadius};
  `}
`;

const StyledLabel = styled.span`
  font-size: ${props => props.theme.components.Checkbox.fontSize};
`;

const StyledWrapper = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  position: relative;
  user-select: none;

  ${props => props.disabled && `
    ${StyledCheckbox} {
      border-color: ${props.theme.components.Checkbox.color.disabled};
      color: ${props.theme.components.Checkbox.color.disabled};
    }

    ${StyledLabel} {
      color: ${props.theme.components.Checkbox.color.disabled};
    }
  `}

  ${props => props.margin && `
    margin: ${props.margin};
  `}
`;

const Checkbox = ({
  checked,
  disabled,
  label,
  margin,
  onChangeHandler,
  rounded,
}) => (
  <StyledWrapper
    disabled={disabled}
    margin={margin}
    onClick={!disabled ? onChangeHandler : undefined}
  >
    <StyledCheckbox checked={checked} rounded={rounded} />
    <StyledLabel>{label}</StyledLabel>
  </StyledWrapper>
);

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  margin: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired,
  rounded: PropTypes.bool,
};

Checkbox.defaultProps = {
  disabled: false,
  margin: undefined,
  rounded: false,
};

export default Checkbox;
