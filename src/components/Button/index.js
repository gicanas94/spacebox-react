import Color from 'color';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { color, font, transition } from '../../styles';

const StyledButtonText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: 2px solid ${props => (
    props.color
      ? color.palette[props.color]
      : props.theme.components.button.color.default
  )};
  color: ${props => (
    props.color
      ? color.palette[props.color]
      : props.theme.components.button.color.default
  )};
  display: flex;
  font-weight: ${font.weight.bold};
  height: 45px;
  justify-content: center;
  padding: 0 15px;
  position: relative;
  transition: background-color ${transition.speed.superfast} linear;
  width: fit-content;

  &:focus {
    outline: none;
  }

  ${props => props.disabled && `
    border-color: ${props.theme.components.button.color.disabled};
    color: ${props.theme.components.button.color.disabled};
  `}

  ${props => !props.disabled && `
    &:hover {
      background-color: ${
        props.color
          ? color.palette[props.color]
          : props.theme.components.button.color.default
      };
      color: ${
        Color(
          props.color
            ? color.palette[props.color]
            : props.theme.components.button.color.default
        ).isDark()
          ? Color(
            props.color
              ? color.palette[props.color]
              : props.theme.components.button.color.default
          ).lighten(0.8).hex()
          : Color(
            props.color
              ? color.palette[props.color]
              : props.theme.components.button.color.default
          ).darken(0.7).hex()
      };
    }
  `}

  ${props => props.fullWidth && `
    width: 100%;
  `}

  ${props => props.margin && `
    margin: ${props.margin};
  `}

  ${props => props.noBorder && `
    border-width: 0;
  `}

  ${props => props.rounded && `
    border-radius: 4px;
  `}

  ${props => props.size === 'small' && `
    height: 40px;
    padding: 0 10px;
  `}

  ${props => props.size === 'large' && `
    height: 50px;
  `}
`;

const Button = ({ children, ...props }) => (
  <StyledButton {...props}>
    <StyledButtonText>
      {children}
    </StyledButtonText>
  </StyledButton>
);

Button.propTypes = {
  color: PropTypes.string,
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  margin: PropTypes.string,
  noBorder: PropTypes.bool,
  rounded: PropTypes.bool,
  size: PropTypes.string,
};

Button.defaultProps = {
  color: undefined,
  disabled: false,
  fullWidth: false,
  margin: undefined,
  noBorder: false,
  rounded: false,
  size: undefined,
};

export default Button;
