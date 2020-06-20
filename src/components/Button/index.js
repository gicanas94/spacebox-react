import Color from 'color';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors, transitions } from '../../styles';

const StyledButton = styled.button`
  align-items: center;
  display: flex;
  filter: ${({ theme }) => theme.components.button.filter};
  font-size: ${({ theme }) => theme.components.button.fontSize};
  font-weight: ${({ theme }) => theme.components.button.fontWeight};
  height: 45px;
  justify-content: center;
  line-height: 1;
  overflow: hidden;
  position: relative;
  transition: all ${transitions.speed.superfast} linear;
  user-select: none;
  width: fit-content;

  ${({ color, disabled, styleType, theme }) =>
    styleType === 'bordered' &&
    `
    background-color: transparent;
    border-color: ${
      color ? colors.palette[color] : theme.components.button.status.default
    };
    border-style: solid;
    border-width: ${theme.components.button.borderWidth};
    color: ${
      color ? colors.palette[color] : theme.components.button.status.default
    };

    ${
      disabled
        ? `
      border-color: ${disabled && theme.components.button.status.disabled};
      color: ${disabled && theme.components.button.status.disabled};
    `
        : `
      &:active,
      &:focus,
      &:hover {
        background-color: ${
          !disabled && color
            ? colors.palette[color]
            : theme.components.button.status.default
        };
        color: ${
          Color(
            color
              ? colors.palette[color]
              : theme.components.button.status.default,
          ).isDark()
            ? Color(
                color
                  ? colors.palette[color]
                  : theme.components.button.status.default,
              )
                .lighten(0.8)
                .hex()
            : Color(
                color
                  ? colors.palette[color]
                  : theme.components.button.status.default,
              )
                .darken(0.7)
                .hex()
        };
      }
    `
    }
  `}

  ${({ color, disabled, styleType, theme }) =>
    styleType === 'filled' &&
    `
    background-color: ${
      color ? colors.palette[color] : theme.components.button.status.default
    };
    border-color: transparent;
    border-style: solid;
    border-width: ${theme.components.button.borderWidth};
    color: ${
      Color(
        color ? colors.palette[color] : theme.components.button.status.default,
      ).isDark()
        ? Color(
            color
              ? colors.palette[color]
              : theme.components.button.status.default,
          )
            .lighten(0.8)
            .hex()
        : Color(
            color
              ? colors.palette[color]
              : theme.components.button.status.default,
          )
            .darken(0.7)
            .hex()
    };

    ${
      disabled
        ? `
      background-color: ${theme.components.button.status.disabled};
      color: ${Color(theme.components.button.status.disabled)
        .darken(0.2)
        .hex()};
    `
        : `
      &:active,
      &:focus,
      &:hover {
        background-color: ${Color(
          color
            ? colors.palette[color]
            : theme.components.button.status.default,
        )
          .darken(0.2)
          .hex()};
      }
    `
    }
  `}

  ${({ color, disabled, styleType, theme }) =>
    styleType === 'unbordered' &&
    `
    background-color: transparent;
    color: ${
      color ? colors.palette[color] : theme.components.button.status.default
    };
    border-color: transparent;
    border-style: solid;
    border-width: ${theme.components.button.borderWidth};

    ${
      disabled
        ? `
      color: ${theme.components.button.status.disabled};
    `
        : `
      &:active,
      &:focus,
      &:hover {
        background-color: ${
          color ? colors.palette[color] : theme.components.button.status.default
        };
        color: ${
          Color(
            color
              ? colors.palette[color]
              : theme.components.button.status.default,
          ).isDark()
            ? Color(
                color
                  ? colors.palette[color]
                  : theme.components.button.status.default,
              )
                .lighten(0.8)
                .hex()
            : Color(
                color
                  ? colors.palette[color]
                  : theme.components.button.status.default,
              )
                .darken(0.7)
                .hex()
        };
      }
    `
    }
  `}

  ${({ disabled }) =>
    !disabled &&
    `
    cursor: pointer;

    &:active {
      transform: translateY(2px);
    }

    &:focus {
      outline: none;
    }
  `}

  ${({ fullWidth }) =>
    fullWidth &&
    `
    width: 100%;
  `}

  ${({ margin }) =>
    margin &&
    `
    margin: ${margin};
  `}

  ${({ padding }) =>
    padding &&
    `
    padding: ${padding};
  `}

  ${({ padding }) =>
    !padding &&
    `
    padding: 0 15px;
  `}

  ${({ rounded, theme }) =>
    rounded &&
    `
    border-radius: ${theme.global.borderRadius};
  `}

  ${({ size }) =>
    size === 'small' &&
    `
    height: 40px;
    padding: 0 10px;
  `}

  ${({ size }) =>
    size === 'large' &&
    `
    height: 50px;
  `}

  ${({ size, theme }) =>
    size === 'headerOnLaptop' &&
    `
    font-size: ${theme.components.button.size.headerOnLaptop.fontSize};
    height: ${theme.components.button.size.headerOnLaptop.height};
  `}

  ${({ size, theme }) =>
    size === 'headerOnMobile' &&
    `
    font-size: ${theme.components.button.size.headerOnMobile.fontSize};
    height: ${theme.components.button.size.headerOnMobile.height};
  `}

  ${({ width }) =>
    width &&
    `
    width: ${width};
  `}
`;

const StyledButtonText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Button = ({ children, dontTranslateChildren, ...props }) => (
  <StyledButton {...props}>
    <StyledButtonText>
      {dontTranslateChildren ? children : <FormattedMessage id={children} />}
    </StyledButtonText>
  </StyledButton>
);

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  dontTranslateChildren: PropTypes.bool,
  fullWidth: PropTypes.bool,
  margin: PropTypes.string,
  padding: PropTypes.string,
  rounded: PropTypes.bool,
  size: PropTypes.string,
  styleType: PropTypes.oneOf(['bordered', 'filled', 'unbordered']).isRequired,
  width: PropTypes.string,
};

Button.defaultProps = {
  color: undefined,
  disabled: false,
  dontTranslateChildren: false,
  fullWidth: false,
  margin: undefined,
  padding: undefined,
  rounded: true,
  size: undefined,
  width: undefined,
};

export default Button;
