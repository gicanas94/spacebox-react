import { Facebook as FacebookIcon } from 'styled-icons/fa-brands/Facebook';
import { Google as GoogleIcon } from 'styled-icons/fa-brands/Google';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Twitter as TwitterIcon } from 'styled-icons/fa-brands/Twitter';

import { transition } from '../../styles';

const StyledButton = styled.button`
  align-items: center;
  border: 0;
  cursor: pointer;
  display: flex;
  font-size: ${({ theme }) => theme.components.SignInWithButton.fontSize};
  font-weight: ${({ theme }) => theme.components.SignInWithButton.fontWeight};
  padding: 10px;
  padding-left: 13px;
  transition: all ${transition.speed.superfast} linear;
  user-select: none;
  width: 270px;

  &:focus {
    outline: none;
  }

  &:focus,
  &:hover {
    transform: scale(1.03);
  }

  ${({ account }) => (account === 'Google') && `
    background-color: #db4437;
    color: #ffffff;
  `}

  ${({ account }) => account === 'Facebook' && `
    background-color: #3b5998;
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
  width: 21px;
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
        {account === 'Google' && <GoogleIcon />}
        {account === 'Facebook' && <FacebookIcon />}
        {account === 'Twitter' && <TwitterIcon />}
      </StyledIcon>
    </StyledIconWrapper>

    <StyledText>{`Sign in with ${account}`}</StyledText>
  </StyledButton>
);

SignInWithButton.propTypes = {
  account: PropTypes.oneOf(['Google', 'Facebook', 'Twitter']).isRequired,
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
