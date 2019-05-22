import Color from 'color';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { color, transition } from '../../styles';

const StyledButton = styled.button`
  align-items: center;
  display: flex;
  font-weight: ${props => props.theme.components.Button.fontWeight};
  height: 45px;
  justify-content: center;
  line-height: 1;
  padding: 0 15px;
  position: relative;
  transition: background-color ${transition.speed.superfast} linear,
    transform ${transition.speed.ultrafast} linear;
  user-select: none;
  width: fit-content;

  &:active {
    transform: scale(0.97);
  }

  &:focus {
    outline: none;
  }

  ${props => !props.disabled && `
    cursor: pointer;

    &:hover {
      ${(props.styleType === 'bordered' || props.styleType === 'unbordered') && `
        background-color: ${
          props.color
            ? color.palette[props.color]
            : props.theme.components.Button.color.default
        };
        color: ${
          Color(
            props.color
              ? color.palette[props.color]
              : props.theme.components.Button.color.default
          ).isDark()
            ? Color(
              props.color
                ? color.palette[props.color]
                : props.theme.components.Button.color.default
            ).lighten(0.8).hex()
            : Color(
              props.color
                ? color.palette[props.color]
                : props.theme.components.Button.color.default
            ).darken(0.7).hex()
        };
      `};

      ${props.styleType === 'filled' && `
        background-color: ${
          Color(
            props.color
              ? color.palette[props.color]
              : props.theme.components.Button.color.default
          ).darken(0.2).hex()
        };
      `}
    }
  `}

  ${props => props.fullWidth && `
    width: 100%;
  `}

  ${props => props.margin && `
    margin: ${props.margin};
  `}

  ${props => props.rounded && `
    border-radius: ${props.theme.global.borderRadius};
  `}

  ${props => props.size === 'small' && `
    height: 40px;
    padding: 0 10px;
  `}

  ${props => props.size === 'large' && `
    height: 50px;
  `}

  ${props => (
    props.styleType === 'bordered' || props.styleType === 'unbordered'
  ) && `
    background-color: transparent;
    color: ${
      props.color
        ? color.palette[props.color]
        : props.theme.components.Button.color.default
    };
  `}

  ${props => props.styleType === 'bordered' && `
    border-color: ${
      props.color
        ? color.palette[props.color]
        : props.theme.components.Button.color.default
    };
    border-style: solid;
    border-width: ${props.theme.components.Button.borderWidth};
  `}

  ${props => (props.styleType === 'bordered' && props.disabled) && `
    border-color: ${props.theme.components.Button.color.disabled};
    color: ${props.theme.components.Button.color.disabled};
  `}

  ${props => props.styleType === 'filled' && `
    background-color: ${
      props.color
        ? color.palette[props.color]
        : props.theme.components.Button.color.default
    };
    border-color: transparent;
    border-style: solid;
    border-width: ${props.theme.components.Button.borderWidth};
    color: ${
      Color(
        props.color
          ? color.palette[props.color]
          : props.theme.components.Button.color.default
      ).isDark()
        ? Color(
          props.color
            ? color.palette[props.color]
            : props.theme.components.Button.color.default
        ).lighten(0.8).hex()
        : Color(
          props.color
            ? color.palette[props.color]
            : props.theme.components.Button.color.default
        ).darken(0.7).hex()
    };
  `}

  ${props => (props.styleType === 'filled' && props.disabled) && `
    background-color: ${props.theme.components.Button.color.disabled};
  `}

  ${props => props.styleType === 'unbordered' && `
    border-color: transparent;
    border-style: solid;
    border-width: ${props.theme.components.Button.borderWidth};
  `}

  ${props => (props.styleType === 'unbordered' && props.disabled) && `
    color: ${props.theme.components.Button.color.disabled};
  `}
`;

const StyledButtonText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  rounded: PropTypes.bool,
  size: PropTypes.string,
  styleType: PropTypes.oneOf(['bordered', 'filled', 'unbordered']).isRequired,
};

Button.defaultProps = {
  color: undefined,
  disabled: false,
  fullWidth: false,
  margin: undefined,
  rounded: false,
  size: undefined,
};

export default Button;
