import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { font } from '../../styles';

const StyledCheckbox = styled.span`
  background-color: transparent;
  border: 2px solid ${props => props.theme.components.checkbox.color.unchecked};
  display: flex;
  height: 25px;
  justify-content: center;
  margin-right: 7px;
  width: 25px;

  ${props => props.checked && `
    border-color: ${props.theme.components.checkbox.color.checked};
    color: ${props.theme.components.checkbox.color.checked};

    &:after {
      content: '✔';
      font-size: ${font.size.xs};
    }
  `}

  ${props => props.rounded && `
    border-radius: 4px;
  `}
`;

const StyledLabel = styled.span`
  font-size: ${font.size.xs};
`;

const StyledWrapper = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  position: relative;
  user-select: none;

  ${props => props.disabled && `
    ${StyledCheckbox} {
      border-color: ${props.theme.components.checkbox.color.disabled};
      color: ${props.theme.components.checkbox.color.disabled};
    }

    ${StyledLabel} {
      color: ${props.theme.components.checkbox.color.disabled};
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
