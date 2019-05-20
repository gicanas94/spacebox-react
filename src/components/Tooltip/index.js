import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

const StyledReactTooltip = styled(ReactTooltip)`
  border-radius: ${props => props.theme.global.borderRadius};
  font-size: ${props => props.theme.components.Tooltip.fontSize};
  font-weight: ${props => props.theme.components.Tooltip.fontWeight};
  padding: 7px;
  transition: none;
`;

const Tooltip = ({ ...props }) => <StyledReactTooltip {...props} />;

export default Tooltip;
