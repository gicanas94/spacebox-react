import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

import { transition } from '../../styles';

const StyledReactTooltipWrapper = styled.div`
  div {
    border-radius: ${({ theme }) => theme.global.borderRadius};
    font-size: ${({ theme }) => theme.components.tooltip.fontSize};
    font-weight: ${({ theme }) => theme.components.tooltip.fontWeight};
    padding: 7px;
    transition: opacity ${transition.speed.fast} linear;

    &.show {
      opacity: 0.8;
    }

    &.search-tooltip {
      margin-top: 25px;
    }
  }
`;

const Tooltip = ({ ...props }) => (
  <StyledReactTooltipWrapper>
    <ReactTooltip {...props} />
  </StyledReactTooltipWrapper>
);

export default Tooltip;
