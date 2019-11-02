import {
  FacebookSquare as FacebookIcon,
} from 'styled-icons/boxicons-logos/FacebookSquare';

import { Google as GoogleIcon } from 'styled-icons/boxicons-logos/Google';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Twitter as TwitterIcon } from 'styled-icons/boxicons-logos/Twitter';

import { transition } from '../../styles';

const StyledButton = styled.button`
  align-items: center;
  border: 0;
  cursor: pointer;
  display: flex;
  filter: ${({ theme }) => theme.components.SignInWithButton.filter};
  font-size: ${({ theme }) => theme.components.SignInWithButton.fontSize};
  font-weight: ${({ theme }) => theme.components.SignInWithButton.fontWeight};
  padding: 10px;
  padding-left: 13px;
  transition: all ${transition.speed.superfast} linear;
  user-select: none;
  width: 270px;

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: none;
  }

  ${({ account }) => account === 'Facebook' && `
    background-color: #3b5998;
    color: #ffffff;
  `}

  ${({ account }) => (account === 'Google') && `
    background-color: #db4437;
    color: #ffffff;
  `}

  ${({ account }) => account === 'Twitter' && `
    background-color: #00acee;
    color: #ffffff;
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
`;

const StyledIconWrapper = styled.div`
  margin-right: 15px;
`;

const StyledIcon = styled.div`
  line-height: 0;
  width: 28px;
`;

const StyledText = styled.div`
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SignInWithButton = ({ account, ...props }) => (
  <StyledButton account={account} {...props}>
    <StyledIconWrapper>
      <StyledIcon>
        {account === 'Facebook' && <FacebookIcon />}
        {account === 'Google' && <GoogleIcon />}
        {account === 'Twitter' && <TwitterIcon />}
      </StyledIcon>
    </StyledIconWrapper>

    <StyledText>{`Sign in with ${account}`}</StyledText>
  </StyledButton>
);

SignInWithButton.propTypes = {
  account: PropTypes.oneOf(['Facebook', 'Google', 'Twitter']).isRequired,
  fullWidth: PropTypes.bool,
  margin: PropTypes.string,
  rounded: PropTypes.bool,
};

SignInWithButton.defaultProps = {
  fullWidth: false,
  margin: undefined,
  rounded: false,
};

export default SignInWithButton;
