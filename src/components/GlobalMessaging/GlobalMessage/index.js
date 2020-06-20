import { CheckmarkOutline as TypeSuccessIcon } from 'styled-icons/zondicons';
import Color from 'color';
import { Cross } from 'styled-icons/icomoon';

import {
  ErrorAlt as TypeDangerIcon,
  InfoCircle as TypeInfoIcon,
} from 'styled-icons/boxicons-regular';

import { ErrorWarning as TypeWarningIcon } from 'styled-icons/remix-line';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { transitions } from '../../../styles';

const StyledReliefEffect = styled.div`
  bottom: -5px;
  filter: ${({ theme }) => theme.components.globalMessage.reliefEffect.filter};
  height: 110%;
  pointer-events: none;
  position: absolute;
  right: -5px;
  width: 110%;
`;

const StyledCloseGlobalMessageIcon = styled(Cross)`
  cursor: pointer;
  height: 20px;
  min-height: 20px
  min-width: 20px;
  position: absolute;
  right: 15px;
  top: 15px;
  transition: transform ${transitions.speed.superfast} linear;
  width: 20px;

  &:active {
    transform: translateY(2px);
  }
`;

const StyledIconAndTitleWrapper = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 15px;
`;

const StyledIconWrapper = styled.div`
  margin-right: 15px;

  & > * {
    height: 35px;
    min-height: 35px
    min-width: 35px;
    width: 35px;
  }
`;

const StyledTitle = styled.p`
  font-size: ${({ theme }) => theme.components.globalMessage.title.fontSize};
  font-weight: ${({ theme }) =>
    theme.components.globalMessage.title.fontWeight};
  margin-bottom: 0;
`;

const StyledContent = styled.p`
  font-size: ${({ theme }) => theme.components.globalMessage.content.fontSize};
  margin-bottom: 0;
`;

const StyledLinkWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const StyledLink = styled.a`
  font-size: ${({ theme }) => theme.components.globalMessage.link.fontSize};
  font-weight: ${({ theme }) => theme.components.globalMessage.link.fontWeight};
  line-height: 1;
  margin-top: 15px;
  width: fit-content;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 15px;
  position: relative;

  ${({ rounded, theme }) =>
    rounded &&
    `
    border-radius: ${theme.global.borderRadius};
  `}

  ${({ type, theme }) =>
    type &&
    `
    background: linear-gradient(
      ${theme.components.globalMessage.type[type].bgColor},
      ${Color(theme.components.globalMessage.type[type].bgColor).darken(0.2)}
    );
    border: ${theme.components.globalMessage.type[type].border};
    color: ${theme.components.globalMessage.type[type].color};

    ${StyledReliefEffect} {
      border: ${theme.components.globalMessage.type[type].reliefEffectBorder};
      border-left: 0;
      border-top: 0;
    }

    ${StyledCloseGlobalMessageIcon} {
      color: ${theme.components.globalMessage.type[type].color};
    }

    ${StyledIconWrapper} {
      & > * {
        color: ${theme.components.globalMessage.type[type].color};
      }
    }

    ${StyledLink} {
      color: ${theme.components.globalMessage.type[type].color};
    }
  `}
`;

const GlobalMessage = ({
  appLocale,
  globalMessage,
  onCloseGlobalMessageIconClickHandler,
  ...props
}) => (
  <StyledWrapper type={globalMessage.type} {...props}>
    <StyledReliefEffect />
    {globalMessage.isDismissible && (
      <StyledCloseGlobalMessageIcon
        onClick={() => onCloseGlobalMessageIconClickHandler(globalMessage)}
      />
    )}

    <StyledIconAndTitleWrapper>
      <StyledIconWrapper>
        {globalMessage.type === 'danger' && <TypeDangerIcon />}
        {globalMessage.type === 'info' && <TypeInfoIcon />}
        {globalMessage.type === 'success' && <TypeSuccessIcon />}
        {globalMessage.type === 'warning' && <TypeWarningIcon />}
      </StyledIconWrapper>

      <StyledTitle>{globalMessage[appLocale].title}</StyledTitle>
    </StyledIconAndTitleWrapper>

    <StyledContent>{globalMessage[appLocale].content}</StyledContent>

    {globalMessage.href && (
      <StyledLinkWrapper>
        <StyledLink href={globalMessage.href} target="_blank">
          {globalMessage[appLocale].link}
        </StyledLink>
      </StyledLinkWrapper>
    )}
  </StyledWrapper>
);

GlobalMessage.propTypes = {
  appLocale: PropTypes.string.isRequired,
  globalMessage: PropTypes.objectOf(PropTypes.any).isRequired,
  onCloseGlobalMessageIconClickHandler: PropTypes.func.isRequired,
  rounded: PropTypes.bool,
};

GlobalMessage.defaultProps = {
  rounded: true,
};

export default GlobalMessage;
