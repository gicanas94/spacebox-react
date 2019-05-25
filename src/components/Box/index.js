import { ArrowAltCircleUp } from 'styled-icons/fa-solid/ArrowAltCircleUp';
import Color from 'color';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

import { color, device, transition } from '../../styles';

const StyledBox = styled.div`
  background-color: ${({ bgColor, theme }) => (
    bgColor
      ? color.palette[bgColor]
      : theme.components.Box.defaultBgColor
  )};
  border-color: ${({ bgColor, theme }) => (
    Color(
      bgColor
        ? color.palette[bgColor]
        : theme.components.Box.defaultBgColor,
    ).darken(0.2).hex()
  )};
  border-style: solid;
  border-width: ${({ theme }) => theme.components.Box.borderWidth};
  margin: auto;
  padding: 25px;
  position: relative;

  ${({ collapsed }) => collapsed && `
    cursor: pointer;
  `}

  ${({ fullHeight }) => fullHeight && `
    height: 100%;
  `}

  ${({ fullWidth }) => fullWidth && `
    width: 100%;
  `}

  ${({ margin }) => margin && `
    margin: ${margin};
  `}

  ${({ minMaxWidth }) => minMaxWidth && `
    min-width: ${minMaxWidth[0]};
    max-width: ${minMaxWidth[1]} !important;
  `}

  ${({ noBorder }) => noBorder && `
    border-width: 0;
  `}

  ${({ padding }) => padding && `
    padding: ${padding};
  `}

  ${({ rounded, theme }) => rounded && `
    border-radius: ${theme.global.borderRadius};
  `}

  ${({ size }) => size === 'small' && `
    width: 100%;

    @media ${device.mobileL} {
      width: 350px;
    }
  `}

  ${({ size }) => size === 'medium' && `
    width: 100%;

    @media ${device.tablet} {
      width: 700px;
    }
  `}

  ${({ size }) => size === 'large' && `
    width: 100%;

    @media ${device.laptop} {
      max-width: 1050px;
    }
  `}
`;

const StyledCollapseTitle = styled.div`
  * {
    margin: 0;
    user-select: none;
  }
`;

const StyledArrow = styled(ArrowAltCircleUp)`
  color: ${({ theme }) => theme.components.Box.arrowColor};
  cursor: pointer;
  height: 25px;
  position: absolute;
  right: 15px;
  top: 18px;
  transition: transform ${transition.speed.superfast} linear;
  width: 25px;

  ${({ collapsed }) => collapsed && `
    transform: rotate(180deg);
  `}
`;

const Box = ({
  children,
  collapsed,
  collapseTitle,
  ...props
}) => {
  const [boxIsCollapsed, setBoxIsCollapsed] = useState(collapsed);

  return (
    <StyledBox
      collapsed={boxIsCollapsed}
      onClick={boxIsCollapsed ? () => setBoxIsCollapsed(!boxIsCollapsed) : null}
      {...props}
    >
      {collapseTitle && boxIsCollapsed
        ? (
          <StyledCollapseTitle>
            {collapseTitle}
          </StyledCollapseTitle>
        ) : children
      }

      {collapseTitle && (
        <StyledArrow
          collapsed={boxIsCollapsed}
          onClick={() => setBoxIsCollapsed(!boxIsCollapsed)}
        />
      )}
    </StyledBox>
  );
};

Box.propTypes = {
  bgColor: PropTypes.string,
  children: PropTypes.node,
  collapsed: PropTypes.bool,
  collapseTitle: PropTypes.node,
  fullHeight: PropTypes.bool,
  fullWidth: PropTypes.bool,
  margin: PropTypes.string,
  minMaxWidth: PropTypes.arrayOf(PropTypes.string),
  noBorder: PropTypes.bool,
  padding: PropTypes.string,
  rounded: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

Box.defaultProps = {
  bgColor: undefined,
  children: undefined,
  collapsed: false,
  collapseTitle: undefined,
  fullHeight: false,
  fullWidth: false,
  margin: undefined,
  minMaxWidth: undefined,
  noBorder: false,
  padding: undefined,
  rounded: false,
  size: undefined,
};

export default Box;
