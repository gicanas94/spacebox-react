import Color from 'color';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { color, device } from '../../styles';

const StyledBox = styled.div`
  background-color: ${props => (
    props.bgColor
      ? color.palette[props.bgColor]
      : props.theme.components.box.bgColor.default
  )};
  margin: auto;
  padding: 25px;

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

  ${props => props.padding && `
    padding: ${props.padding};
  `}

  ${props => props.rounded && `
    border-radius: 4px;
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

  ${props => props.withBorder && `
    border: 1px solid ${Color(
      props.bgColor
        ? color.palette[props.bgColor]
        : props.theme.components.box.bgColor.default
    ).darken(0.3).hex()};
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
  padding: PropTypes.string,
  rounded: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  withBorder: PropTypes.bool,
};

Box.defaultProps = {
  bgColor: undefined,
  children: undefined,
  fullHeight: false,
  fullWidth: false,
  margin: undefined,
  minMaxWidth: undefined,
  padding: undefined,
  rounded: false,
  size: undefined,
  withBorder: false,
};

export default Box;
