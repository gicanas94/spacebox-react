import { ErrorOutline } from 'styled-icons/material';
import { EyeOff2 } from 'styled-icons/evaicons-solid';
import { EyeOutline } from 'styled-icons/evaicons-outline';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import styled from 'styled-components';

import { keyframe, transition } from '../../styles';

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.components.input.status.default};
  display: block;
  font-size: ${({ theme }) => theme.components.input.label.fontSize};
  font-weight: ${({ theme }) => theme.components.input.label.fontWeight};
  overflow: hidden;
  padding-bottom: 2px;
  text-overflow: ellipsis;
  transition: color ${transition.speed.superfast} linear;
  white-space: nowrap;

  ${({ disabled, theme }) => disabled && `
    color: ${theme.components.input.status.disabled} !important;
  `}
`;

const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.components.input.bgColor};
  border: 0;
  border-bottom-width: ${({ theme }) => (
    theme.components.input.borderBottomWidth
  )};
  border-color: ${({ theme }) => theme.components.input.status.default};
  border-style: solid;
  padding: 0 10px;
  padding-top: 5px;
  height: 45px;
  transition: border ${transition.speed.superfast} linear;
  width: 100%;

  &:focus {
    outline: none;
  }

  ${({ disabled, theme }) => disabled && `
    color: ${theme.components.input.status.disabled} !important;
    border-color: ${theme.components.input.status.disabled} !important;

    ::placeholder {
      color: ${theme.components.input.status.disabled} !important;
    }

    :-ms-input-placeholder {
      color: ${theme.components.input.status.disabled} !important;
    }

    ::-ms-input-placeholder {
      color: ${theme.components.input.status.disabled} !important;
    }
  `}

  ${({ rounded, theme }) => rounded && `
    border-top-left-radius: ${theme.global.borderRadius};
    border-top-right-radius: ${theme.global.borderRadius};
  `}
`;

const StyledErrorMessage = styled.div`
  color: ${({ theme }) => theme.components.input.status.error};
  font-size: ${({ theme }) => theme.components.input.errorMessage.fontSize};
  font-weight: ${({ theme }) => theme.components.input.errorMessage.fontWeight};
  padding-top: 5px;
`;

const StyledIconsWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 33px;
`;

const StyledOpenedEyeIcon = styled(EyeOutline)`
  color: ${({ theme }) => theme.components.input.status.default};
  cursor: pointer;
  width: 30px;
`;

const StyledClosedEyeIcon = styled(EyeOff2)`
  color: ${({ theme }) => theme.components.input.status.default};
  cursor: pointer;
  width: 30px;
`;

const StyledErrorIcon = styled(ErrorOutline)`
  animation: ${transition.speed.normal} infinite ${keyframe.beat(1.1)};
  color: ${({ theme }) => theme.components.input.status.error};
  margin-left: 5px;
  width: 30px;
`;

const StyledWrapper = styled.div`
  overflow: hidden;
  position: relative;

  ${({ error, theme }) => error && `
    ${StyledLabel} {
      color: ${theme.components.input.status.error};
    }

    ${StyledInput} {
      border-color: ${theme.components.input.status.error};
    }
  `}

  ${({ error, initialInputTypeIsPassword }) => (
    !error && initialInputTypeIsPassword
  ) && `
    ${StyledInput} {
      padding-right: 45px;
    }
  `}

  ${({ error, initialInputTypeIsPassword }) => (
    error && !initialInputTypeIsPassword
  ) && `
    ${StyledInput} {
      padding-right: 45px;
    }
  `}

  ${({ error, initialInputTypeIsPassword }) => (
    error && initialInputTypeIsPassword
  ) && `
    ${StyledInput} {
      padding-right: 80px;
    }
  `}

  ${({ margin }) => margin && `
    margin: ${margin};
  `}

  ${({ success, theme }) => success && `
    ${StyledLabel} {
      color: ${theme.components.input.status.success};
    }

    ${StyledInput} {
      border-color: ${theme.components.input.status.success};
    }
  `}
`;

const Input = ({
  disabled,
  error,
  name,
  label,
  margin,
  success,
  type,
  ...props
}) => {
  const inputId = `input-component_${name}`;
  const initialInputTypeIsPassword = type === 'password';
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const handleOpenedEyeIconClick = () => {
    setPasswordIsVisible(true);
    document.getElementById(inputId).type = 'text';
  };

  const handleClosedEyeIconClick = () => {
    setPasswordIsVisible(false);
    document.getElementById(inputId).type = 'password';
  };

  return (
    <StyledWrapper
      error={error}
      initialInputTypeIsPassword={initialInputTypeIsPassword}
      margin={margin}
      success={success}
    >
      <StyledLabel disabled={disabled} htmlFor={name}>
        <FormattedMessage id={label} />
      </StyledLabel>

      <StyledInput
        disabled={disabled}
        id={inputId}
        name={name}
        type={type}
        {...props}
      />

      {!disabled && error && (
        <StyledErrorMessage>
          <FormattedMessage defaultMessage={error} id={error} />
        </StyledErrorMessage>
      )}

      {!disabled && (
        <StyledIconsWrapper>
          {initialInputTypeIsPassword && (
            <Fragment>
              {!passwordIsVisible && (
                <StyledOpenedEyeIcon onClick={handleOpenedEyeIconClick} />
              )}

              {passwordIsVisible && (
                <StyledClosedEyeIcon onClick={handleClosedEyeIconClick} />
              )}
            </Fragment>
          )}

          {error && <StyledErrorIcon />}
        </StyledIconsWrapper>
      )}
    </StyledWrapper>
  );
};

Input.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  margin: PropTypes.string,
  rounded: PropTypes.bool,
  success: PropTypes.bool,
  type: PropTypes.string.isRequired,
};

Input.defaultProps = {
  disabled: false,
  error: undefined,
  margin: undefined,
  rounded: undefined,
  success: false,
};

export default Input;
