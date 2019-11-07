import Color from 'color';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import colors from '../../styles/color';
import { transition } from '../../styles';

const StyledButton = styled.button`
  align-items: center;
  display: flex;
  filter: ${({ theme }) => theme.components.Button.filter};
  font-size: ${({ theme }) => theme.components.Button.fontSize};
  font-weight: ${({ theme }) => theme.components.Button.fontWeight};
  height: 45px;
  justify-content: center;
  line-height: 1;
  padding: 0 15px;
  position: relative;
  transition: all ${transition.speed.superfast} linear;
  user-select: none;
  width: fit-content;

  ${({
    color,
    disabled,
    styleType,
    theme,
  }) => !disabled && `
    cursor: pointer;

    &:active {
      // transform: scale(0.97);
      transform: translateY(2px);
    }

    &:focus {
      outline: none;
    }

    &:focus,
    &:hover {
      ${(styleType === 'bordered' || styleType === 'unbordered') && `
        background-color: ${
          color
            ? colors.palette[color]
            : theme.components.Button.color.default
        };
        color: ${
          Color(
            color
              ? colors.palette[color]
              : theme.components.Button.color.default
          ).isDark()
            ? Color(
              color
                ? colors.palette[color]
                : theme.components.Button.color.default
            ).lighten(0.8).hex()
            : Color(
              color
                ? colors.palette[color]
                : theme.components.Button.color.default
            ).darken(0.7).hex()
        };
      `};

      ${styleType === 'filled' && `
        background-color: ${
          Color(
            color
              ? colors.palette[color]
              : theme.components.Button.color.default
          ).darken(0.2).hex()
        };
      `}
    }
  `}

  ${({ fullWidth }) => fullWidth && `
    width: 100%;
  `}

  ${({ margin }) => margin && `
    margin: ${margin};
  `}

  ${({ rounded, theme }) => rounded && `
    border-radius: ${theme.global.borderRadius};
  `}

  ${({ size }) => size === 'small' && `
    height: 40px;
    padding: 0 10px;
  `}

  ${({ size }) => size === 'large' && `
    height: 50px;
  `}

  ${({ styleType, color, theme }) => (
    styleType === 'bordered' || styleType === 'unbordered'
  ) && `
    background-color: transparent;
    color: ${
      color
        ? colors.palette[color]
        : theme.components.Button.color.default
    };
  `}

  ${({ styleType, color, theme }) => styleType === 'bordered' && `
    border-color: ${
      color
        ? colors.palette[color]
        : theme.components.Button.color.default
    };
    border-style: solid;
    border-width: ${theme.components.Button.borderWidth};
  `}

  ${({ styleType, disabled, theme }) => (
    styleType === 'bordered' && disabled
  ) && `
    border-color: ${theme.components.Button.color.disabled};
    color: ${theme.components.Button.color.disabled};
  `}

  ${({ styleType, color, theme }) => styleType === 'filled' && `
    background-color: ${
      color
        ? colors.palette[color]
        : theme.components.Button.color.default
    };
    border-color: transparent;
    border-style: solid;
    border-width: ${theme.components.Button.borderWidth};
    color: ${
      Color(
        color
          ? colors.palette[color]
          : theme.components.Button.color.default
      ).isDark()
        ? Color(
          color
            ? colors.palette[color]
            : theme.components.Button.color.default
        ).lighten(0.8).hex()
        : Color(
          color
            ? colors.palette[color]
            : theme.components.Button.color.default
        ).darken(0.7).hex()
    };
  `}

  ${({ styleType, disabled, theme }) => (
    styleType === 'filled' && disabled
  ) && `
    background-color: ${theme.components.Button.color.disabled};
    color: ${Color(theme.components.Button.color.disabled).darken(0.2).hex()};
  `}

  ${({ styleType, theme }) => styleType === 'unbordered' && `
    border-color: transparent;
    border-style: solid;
    border-width: ${theme.components.Button.borderWidth};
  `}

  ${({ styleType, disabled, theme }) => (
    styleType === 'unbordered' && disabled
  ) && `
    color: ${theme.components.Button.color.disabled};
  `}

  ${({ width }) => width && `
    width: ${width};
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
      <FormattedMessage id={children} />
    </StyledButtonText>
  </StyledButton>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  margin: PropTypes.string,
  rounded: PropTypes.bool,
  size: PropTypes.string,
  styleType: PropTypes.oneOf(['bordered', 'filled', 'unbordered']).isRequired,
  width: PropTypes.string,
};

Button.defaultProps = {
  color: undefined,
  disabled: false,
  fullWidth: false,
  margin: undefined,
  rounded: false,
  size: undefined,
  width: undefined,
};

export default Button;
