import React from 'react';
import styled from 'styled-components';

import { colors, keyframes } from '../../styles';

const StyledWrapper = styled.div`
  animation: ${keyframes.gradient()} 15s infinite;
  background: linear-gradient(45deg, ${colors.gradient.pastelRainbow});
  background-repeat: no-repeat;
  background-size: 300%;
  width: 150px;
  height: 150px;
`;

const SButton = () => <StyledWrapper />;

export default SButton;
