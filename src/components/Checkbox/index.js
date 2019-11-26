import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledCheckbox = styled.span`
  background-color: transparent;
  border-color: ${({ theme }) => theme.components.checkbox.color.unchecked};
  border-style: solid;
  border-width: ${({ theme }) => theme.components.checkbox.borderWidth};
  display: flex;
  height: 25px;
  justify-content: center;
  margin-right: 7px;
  width: 25px;

  ${({ checked, theme }) => checked && `
    border-color: ${theme.components.checkbox.color.checked};
    color: ${theme.components.checkbox.color.checked};

    &:after {
      content: '✔';
      font-size: ${theme.components.checkbox.fontSize};
    }
  `}

  ${({ rounded, theme }) => rounded && `
    border-radius: ${theme.global.borderRadius};
  `}
`;

const StyledLabel = styled.span`
  font-size: ${({ theme }) => theme.components.checkbox.fontSize};
`;

const StyledWrapper = styled.div`
  align-items: flex-end;
  cursor: pointer;
  display: flex;
  position: relative;
  user-select: none;

  ${({ disabled, theme }) => disabled && `
    ${StyledCheckbox} {
      border-color: ${theme.components.checkbox.color.disabled};
      color: ${theme.components.checkbox.color.disabled};
    }

    ${StyledLabel} {
      color: ${theme.components.checkbox.color.disabled};
    }
  `}

  ${({ error, theme }) => error && `
    ${StyledCheckbox} {
      border-color: ${theme.components.checkbox.color.error};
    }

    ${StyledLabel} {
      color: ${theme.components.checkbox.color.error};
    }
  `}

  ${({ margin }) => margin && `
    margin: ${margin};
  `}
`;

const Checkbox = ({
  checked,
  disabled,
  error,
  label,
  margin,
  onChangeHandler,
  rounded,
}) => (
  <StyledWrapper
    disabled={disabled}
    error={error}
    margin={margin}
    onClick={!disabled ? onChangeHandler : undefined}
  >
    <StyledCheckbox checked={checked} rounded={rounded} />

    <StyledLabel>
      <FormattedMessage id={label} />
    </StyledLabel>
  </StyledWrapper>
);

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  label: PropTypes.string.isRequired,
  margin: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired,
  rounded: PropTypes.bool,
};

Checkbox.defaultProps = {
  disabled: false,
  error: false,
  margin: undefined,
  rounded: false,
};

export default Checkbox;
