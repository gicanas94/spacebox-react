import { ErrorOutline } from 'styled-icons/material/ErrorOutline';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { keyframe, transition } from '../../styles';

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.components.Input.color.default};
  font-size: ${({ theme }) => theme.components.Input.label.fontSize};
  font-weight: ${({ theme }) => theme.components.Input.label.fontWeight};
  overflow: hidden;
  padding-bottom: 2px;
  text-overflow: ellipsis;
  transition: color ${transition.speed.superfast} linear;
  white-space: nowrap;

  ${({ disabled, theme }) => disabled && `
    color: ${theme.components.Input.color.disabled} !important;
  `}
`;

const StyledTextarea = styled.textarea`
  background-color: transparent;
  border: 0;
  border-color: ${({ theme }) => theme.components.Input.color.default};
  border-style: solid;
  border-width: ${({ theme }) => theme.components.Input.borderWidth};
  height: 189px;
  padding: 10px;
  resize: none;
  transition: border ${transition.speed.superfast} linear;
  width: 100%;

  &:focus {
    outline: none;
  }

  ${({ disabled, theme }) => disabled && `
    color: ${theme.components.Input.color.disabled} !important;
    border-color: ${theme.components.Input.color.disabled} !important;

    ::placeholder {
      color: ${theme.components.Input.color.disabled} !important;
    }

    :-ms-input-placeholder {
      color: ${theme.components.Input.color.disabled} !important;
    }

    ::-ms-input-placeholder {
      color: ${theme.components.Input.color.disabled} !important;
    }
  `}

  ${({ rounded, theme }) => rounded && `
    border-radius: ${theme.global.borderRadius};
  `}
`;

const StyledErrorIcon = styled(ErrorOutline)`
  animation: ${transition.speed.normal} infinite ${keyframe.beat(1.1)};
  bottom: 30px;
  color: ${({ theme }) => theme.components.Input.color.error};
  position: absolute;
  right: 10px;
  width: 30px;
`;

const StyledErrorMessage = styled.div`
  color: ${({ theme }) => theme.components.Input.color.error};
  font-size: ${({ theme }) => theme.components.Input.errorMessage.fontSize};
  font-weight: ${({ theme }) => theme.components.Input.errorMessage.fontWeight};
  overflow: hidden;
  padding-top: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 236px;
  justify-content: flex-start;
  position: relative;

  ${({ error, theme }) => error && `
    ${StyledLabel} {
      color: ${theme.components.Input.color.error};
    }

    ${StyledTextarea} {
      border-color: ${theme.components.Input.color.error};
    }
  `}

  ${({ margin }) => margin && `
    margin: ${margin};
  `}

  ${({ success, theme }) => success && `
    ${StyledLabel} {
      color: ${theme.components.Input.color.success};
    }

    ${StyledTextarea} {
      border-color: ${theme.components.Input.color.success};
    }
  `}
`;

const Textarea = ({
  disabled,
  error,
  name,
  label,
  margin,
  success,
  ...props
}) => (
  <StyledWrapper error={error} margin={margin} success={success}>
    <StyledLabel disabled={disabled} htmlFor={name}>{label}</StyledLabel>
    <StyledTextarea disabled={disabled} id={name} {...props} />
    {!disabled && error && <StyledErrorIcon />}
    {!disabled && error && <StyledErrorMessage>{error}</StyledErrorMessage>}
  </StyledWrapper>
);

Textarea.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  margin: PropTypes.string,
  rounded: PropTypes.bool,
  success: PropTypes.bool,
};

Textarea.defaultProps = {
  disabled: false,
  error: undefined,
  margin: undefined,
  rounded: false,
  success: false,
};

export default Textarea;
