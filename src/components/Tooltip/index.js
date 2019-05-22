import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

const StyledReactTooltipWrapper = styled.div`
  div {
    border-radius: ${props => props.theme.global.borderRadius};
    font-size: ${props => props.theme.components.Tooltip.fontSize};
    font-weight: ${props => props.theme.components.Tooltip.fontWeight};
    padding: 7px;

    &.show {
      opacity: 0.7;
    }
  }
`;

const Tooltip = ({ ...props }) => (
  <StyledReactTooltipWrapper>
    <ReactTooltip {...props} />
  </StyledReactTooltipWrapper>
);

export default Tooltip;
