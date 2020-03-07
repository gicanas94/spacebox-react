import autosize from 'autosize';
import { ErrorOutline } from 'styled-icons/material';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
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

const StyledTextarea = styled.textarea`
  background-color: ${({ theme }) => theme.components.input.bgColor};
  border: 0;
  border-bottom-width: ${({ theme }) => (
    theme.components.input.borderBottomWidth
  )};
  border-color: ${({ theme }) => theme.components.input.status.default};
  border-style: solid;
  padding: 10px;
  resize: none;
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

const StyledErrorIcon = styled(ErrorOutline)`
  animation: ${transition.speed.normal} infinite ${keyframe.beat(1.1)};
  background-color: ${({ theme }) => theme.components.input.bgColor};
  bottom: 34px;
  color: ${({ theme }) => theme.components.input.status.error};
  position: absolute;
  right: 10px;
  width: 30px;
`;

const StyledErrorMessage = styled.div`
  color: ${({ theme }) => theme.components.input.status.error};
  font-size: ${({ theme }) => theme.components.input.errorMessage.fontSize};
  font-weight: ${({ theme }) => theme.components.input.errorMessage.fontWeight};
`;

const StyledWrapper = styled.div`
  overflow: hidden;
  position: relative;

  ${({ error, theme }) => error && `
    ${StyledLabel} {
      color: ${theme.components.input.status.error};
    }

    ${StyledTextarea} {
      border-color: ${theme.components.input.status.error};
    }
  `}

  ${({ margin }) => margin && `
    margin: ${margin};
  `}

  ${({ success, theme }) => success && `
    ${StyledLabel} {
      color: ${theme.components.input.status.success};
    }

    ${StyledTextarea} {
      border-color: ${theme.components.input.status.success};
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
}) => {
  const textareaId = `textarea-component_${name}`;

  useEffect(() => {
    autosize(document.getElementById(textareaId));

    return () => {
      autosize.destroy(document.getElementById(textareaId));
    };
  }, []);

  return (
    <StyledWrapper error={error} margin={margin} success={success}>
      <StyledLabel disabled={disabled} htmlFor={textareaId}>
        <FormattedMessage id={label} />
      </StyledLabel>

      <StyledTextarea
        disabled={disabled}
        id={textareaId}
        name={name}
        {...props}
      />

      {!disabled && error && (
        <Fragment>
          <StyledErrorIcon />

          <StyledErrorMessage>
            <FormattedMessage defaultMessage={error} id={error} />
          </StyledErrorMessage>
        </Fragment>
      )}
    </StyledWrapper>
  );
};

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
  rounded: undefined,
  success: false,
};

export default Textarea;
