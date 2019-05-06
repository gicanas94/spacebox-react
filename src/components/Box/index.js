import Color from 'color';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { color, device } from '../../styles';

const StyledBox = styled.div`
  background-color: ${props => (
    props.bgColor
      ? color.palette[props.bgColor]
      : props.theme.components.Box.defaultBgColor
  )};
  border-color: ${props => (
    Color(
      props.bgColor
        ? color.palette[props.bgColor]
        : props.theme.components.Box.defaultBgColor,
    ).darken(0.2).hex()
  )};
  border-style: solid;
  border-width: ${props => props.theme.components.Box.borderWidth};
  margin: auto;
  padding: 25px;
  position: relative;

  ${props => props.fullHeight && `
    height: 100%;
  `}

  ${props => props.fullWidth && `
    width: 100%;
  `}

  ${props => props.margin && `
    margin: ${props.margin};
  `}

  ${props => props.minMaxWidth && `
    min-width: ${props.minMaxWidth[0]};
    max-width: ${props.minMaxWidth[1]} !important;
  `}

  ${props => props.noBorder && `
    border-width: 0;
  `}

  ${props => props.padding && `
    padding: ${props.padding};
  `}

  ${props => props.rounded && `
    border-radius: ${props.theme.global.borderRadius};
  `}

  ${props => props.size === 'small' && `
    width: 100%;

    @media ${device.mobileL} {
      width: 350px;
    }
  `}

  ${props => props.size === 'medium' && `
    width: 100%;

    @media ${device.tablet} {
      width: 700px;
    }
  `}

  ${props => props.size === 'large' && `
    width: 100%;

    @media ${device.laptop} {
      max-width: 1050px;
    }
  `}
`;

const Box = ({ children, ...props }) => (
  <StyledBox {...props}>{children}</StyledBox>
);

Box.propTypes = {
  bgColor: PropTypes.string,
  children: PropTypes.node,
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
