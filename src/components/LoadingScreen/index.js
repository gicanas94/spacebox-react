import { FormattedMessage } from 'react-intl';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { keyframe } from '../../styles';

const StyledWrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.components.loadingScreen.bgColor};
  display: flex;
  flex-direction: column;
  height: 100vh;
  left: 0;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1400;
`;

const StyledHeart = styled.div`
  animation: ${keyframe.beat(1.07)} 1s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
  height: 150px !important;
  opacity: 1;
  position: relative;
  transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
  width: 150px !important;

  div {
    background: ${({ theme }) => theme.components.loadingScreen.heartColor};
    height: 60px;
    left: 45px;
    position: absolute;
    top: 54px;
    transform: rotate(45deg);
    width: 60px;
  }

  div:after,
  div:before {
    background: ${({ theme }) => theme.components.loadingScreen.heartColor};
    content: "";
    display: block;
    height: 60px;
    position: absolute;
    width: 60px;
  }

  div:before {
    border-radius: 50% 0 0 50%;
    left: -39px;
  }

  div:after {
    border-radius: 50% 50% 0 0;
    top: -39px;
  }
`;

const StyledText = styled.span`
  color: ${({ theme }) => theme.components.loadingScreen.text.color};
  font-size: ${({ theme }) => theme.components.loadingScreen.text.fontSize};
  font-weight: ${({ theme }) => theme.components.loadingScreen.text.fontWeight};
  margin-bottom: 15px;
`;

const LoadingScreen = ({ ...props }) => {
  useEffect(() => {
    document.getElementById('page-content').style.filter = 'blur(2px)';

    return () => {
      document.getElementById('page-content').style.filter = 'none';
    };
  }, []);

  return (
    <StyledWrapper {...props}>
      <StyledText>
        <FormattedMessage id="components.loadingScreen.text" />
      </StyledText>

      <StyledHeart><div /></StyledHeart>
    </StyledWrapper>
  );
};

export default LoadingScreen;
