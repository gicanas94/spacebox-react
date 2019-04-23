import { Facebook } from 'styled-icons/fa-brands/Facebook';
import { Google } from 'styled-icons/fa-brands/Google';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Twitter } from 'styled-icons/fa-brands/Twitter';

import { font, transition } from '../../styles';

const StyledButton = styled.button`
  align-items: center;
  border: 0;
  display: flex;
  font-weight: ${font.weight.medium};
  padding: 10px;
  padding-left: 13px;
  transition: all ${transition.speed.superfast} linear;
  width: 270px;

  &:focus,
  &:hover {
    transform: scale(1.03);
  }

  ${props => (props.account === 'Google') && `
    background-color: #db4437;
    color: #ffffff;
  `}

  ${props => props.account === 'Facebook' && `
    background-color: #3b5998;
    color: #ffffff;
  `}

  ${props => props.account === 'Twitter' && `
    background-color: #00acee;
    color: #ffffff;
  `}

  ${props => props.fullWidth && `
    width: 100%;
  `}

  ${props => props.margin && `
    margin: ${props.margin};
  `}

  ${props => props.rounded && `
    border-radius: 4px;
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
        {account === 'Google' && <Google />}
        {account === 'Facebook' && <Facebook />}
        {account === 'Twitter' && <Twitter />}
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
