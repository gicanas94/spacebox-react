import Color from 'color';
import { FormattedMessage } from 'react-intl';
import { KeyboardArrowUp } from 'styled-icons/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

import { colors, devices, transitions } from '../../styles';

const StyledCollapseTitle = styled.div`
  align-items: center;
  display: flex;
  cursor: pointer;
  justify-content: space-between;

  * {
    margin: 0;
    user-select: none;
  }
`;

const StyledArrowIcon = styled(KeyboardArrowUp)`
  color: ${({ theme }) => theme.components.box.arrowIcon.color};
  height: 30px;
  transition: transform ${transitions.speed.superfast} linear;
  width: 30px;
`;

const StyledBox = styled.div`
  background-color: ${({ bgColor, theme }) =>
    bgColor ? colors.palette[bgColor] : theme.components.box.bgColor};
  border-color: ${({ bgColor, theme }) =>
    bgColor
      ? Color(colors.palette[bgColor]).darken(0.2).hex()
      : theme.components.box.borderColor};
  border-style: solid;
  border-width: ${({ theme }) => theme.components.box.borderWidth};
  margin: auto;
  position: relative;

  ${({ collapsed, padding }) =>
    !collapsed &&
    `
    padding: ${padding};

    ${StyledCollapseTitle} {
      margin-bottom: ${padding};
    }
  `}

  ${({ collapsed, padding }) =>
    collapsed &&
    `
    ${StyledCollapseTitle} {
      padding: ${padding};
    }

    ${StyledArrowIcon} {
      transform: rotate(180deg);
    }
  `}

  ${({ fullHeight }) =>
    fullHeight &&
    `
    height: 100%;
  `}

  ${({ fullWidth }) =>
    fullWidth &&
    `
    width: 100%;
  `}

  ${({ margin }) =>
    margin &&
    `
    margin: ${margin};
  `}

  ${({ minMaxHeight }) =>
    minMaxHeight &&
    `
    min-height: ${minMaxHeight[0]};
    max-height: ${minMaxHeight[1]} !important;
  `}

  ${({ minMaxWidth }) =>
    minMaxWidth &&
    `
    min-width: ${minMaxWidth[0]};
    max-width: ${minMaxWidth[1]} !important;
  `}

  ${({ noBorder }) =>
    noBorder &&
    `
    border-width: 0;
  `}

  ${({ rounded, theme }) =>
    rounded &&
    `
    border-radius: ${theme.global.borderRadius};
  `}

  ${({ size }) =>
    size === 'small' &&
    `
    width: 100%;

    @media ${devices.mobileL} {
      width: 350px;
    }
  `}

  ${({ size }) =>
    size === 'medium' &&
    `
    width: 100%;

    @media ${devices.tablet} {
      width: 700px;
    }
  `}

  ${({ size }) =>
    size === 'large' &&
    `
    width: 100%;

    @media ${devices.laptop} {
      max-width: 1050px;
    }
  `}
`;

const Box = ({ children, collapsed, collapseTitle, padding, ...props }) => {
  const [boxIsCollapsed, setBoxIsCollapsed] = useState(collapsed);

  return (
    <StyledBox collapsed={boxIsCollapsed} padding={padding} {...props}>
      {collapseTitle ? (
        <>
          <StyledCollapseTitle
            onClick={() => setBoxIsCollapsed(!boxIsCollapsed)}
          >
            <FormattedMessage
              id={collapseTitle}
              values={{
                h3: (...chunks) => <h3>{chunks}</h3>,
              }}
            />
            <StyledArrowIcon collapsed={boxIsCollapsed} />
          </StyledCollapseTitle>

          {!boxIsCollapsed && children}
        </>
      ) : (
        children
      )}
    </StyledBox>
  );
};

Box.propTypes = {
  bgColor: PropTypes.string,
  children: PropTypes.node,
  collapsed: PropTypes.bool,
  collapseTitle: PropTypes.string,
  fullHeight: PropTypes.bool,
  fullWidth: PropTypes.bool,
  margin: PropTypes.string,
  minMaxHeight: PropTypes.arrayOf(PropTypes.string),
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
  minMaxHeight: undefined,
  minMaxWidth: undefined,
  noBorder: false,
  padding: '25px',
  rounded: true,
  size: undefined,
};

export default Box;
