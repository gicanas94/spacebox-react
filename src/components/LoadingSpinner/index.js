import React from 'react';
import styled from 'styled-components';

import { keyframe } from '../../styles';

const StyledWrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.components.LoadingSpinner.bgColor};
  display: flex;
  height: 100vh;
  left: 0;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1500;
`;

const StyledHeart = styled.div`
  animation: ${keyframe.beat(1.07)} 1s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
  height: 200px !important;
  opacity: 1;
  position: relative;
  transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
  width: 200px !important;

  div {
    background: ${({ theme }) => theme.components.LoadingSpinner.spinnerColor};
    height: 80px;
    left: 60px;
    position: absolute;
    top: 72px;
    transform: rotate(45deg);
    width: 80px;
  }

  div:after,
  div:before {
    background: ${({ theme }) => theme.components.LoadingSpinner.spinnerColor};
    content: "";
    display: block;
    height: 80px;
    position: absolute;
    width: 80px;
  }

  div:before {
    border-radius: 50% 0 0 50%;
    left: -52px;
  }

  div:after {
    border-radius: 50% 50% 0 0;
    top: -52px;
  }
`;

const LoadingSpinner = () => (
  <StyledWrapper>
    <StyledHeart><div /></StyledHeart>
  </StyledWrapper>
);

export default LoadingSpinner;
