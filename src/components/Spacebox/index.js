import Color from 'color';
import { Heart } from 'styled-icons/fa-solid/Heart';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { color, font, transition } from '../../styles';

const StyledTitle = styled.div`
  font-family: ${font.family.AlegreyaSans};
  font-size: ${font.size.lm};
  font-weight: ${font.weight.bold};
  line-height: 1em;
  max-height: 4em;
  overflow: hidden;
  padding-left: 15px;
  padding-right: 45px;
  position: absolute;
  text-align: justify;
  text-transform: uppercase;
  transition: blur ${transition.speed.fast} linear,
  opacity ${transition.speed.fast} linear;
  width: 100%;
  word-wrap: break-word;

  &:before {
    bottom: 0;
    content: '...';
    position: absolute;
    right: 20px;
  }

  &:after {
    content: '';
    height: 1em;
    margin-top: 0.2em;
    position: absolute;
    right: 20px;
    width: 0.7em;
  }
`;

const StyledDescription = styled.div`
  font-size: ${font.size.xs};
  font-weight: ${font.weight.medium};
  line-height: 1em;
  max-height: 8em;
  opacity: 0;
  overflow: hidden;
  padding-left: 10px;
  padding-right: 25px;
  position: absolute;
  text-align: justify;
  transition: opacity ${transition.speed.fast} linear,
  visibility ${transition.speed.fast} linear;
  visibility: hidden;
  width: 100%;
  word-wrap: break-word;

  &:before {
    bottom: 0;
    content: '...';
    position: absolute;
    right: 12px;
  }

  &:after {
    content: '';
    height: 1em;
    margin-top: 0.2em;
    position: absolute;
    right: 12px;
    width: 1em;
  }
`;

const StyledBubblesWrapper = styled.div`
  align-items: space-between;
  display: flex;
  justify-content: space-between;
  padding: 7px;
  position: absolute;
  top: 0;
  width: 100%;
`;

const StyledBubble = styled.div`
  align-items: center;
  border-radius: 3px;
  display: flex;
  font-size: ${font.size.xxs};
  font-weight: ${font.weight.bold};
  height: 25px;
  padding: 0 5px;
`;

const StyledHeart = styled(Heart)`
  color: ${color.palette.red};
  filter: none !important;
  width: 16px;
  margin-right: 5px;
`;

const StyledSpacebox = styled.div`
  align-items: flex-end;
  background: ${props => `
    linear-gradient(
      ${Color(props.bgColor).lighten(0.2).hex()},
      ${Color(props.bgColor).hex()}
    )
  `};
  border: 1px solid ${props => (
    Color(props.bgColor).isDark()
      ? Color(props.bgColor).lighten(0.3).hex()
      : Color(props.bgColor).darken(0.3).hex()
  )};
  display: flex;
  height: 220px;
  justify-content: center;
  overflow: hidden;
  padding-bottom: 7px;
  position: relative;
  width: 100%;

  ${props => props.rounded && `
    border-radius: 4px;
  `}

  &:hover {
    ${StyledTitle} {
      filter: blur(4px);
      opacity: 0.2;
    }

    ${StyledDescription} {
      opacity: 1;
      visibility: visible;
    }
  }

  ${StyledBubble} {
    background-color: ${props => (
      Color(props.bgColor).isDark()
        ? 'rgba(255, 255, 255, 0.5)'
        : 'rgba(0, 0, 0, 0.3)'
    )};
    color: ${props => (
      Color(props.bgColor).isDark()
        ? color.palette.asphalt
        : color.palette.cloud
    )};
  }

  ${StyledTitle} {
    color: ${props => props.color};

    &:after {
      background-color: ${props => props.bgColor};
    }
  }

  ${StyledDescription} {
    color: ${props => props.color};

    &:after {
      background-color: ${props => props.bgColor};
    }
  }
`;

const Spacebox = ({
  category,
  description,
  likes,
  title,
  ...props
}) => (
  <StyledSpacebox {...props}>
    <StyledBubblesWrapper>
      <StyledBubble>
        <StyledHeart />
        {likes}
      </StyledBubble>

      <StyledBubble>{category}</StyledBubble>
    </StyledBubblesWrapper>

    <StyledTitle>{title}</StyledTitle>

    {description && <StyledDescription>{description}</StyledDescription>}
  </StyledSpacebox>
);

Spacebox.propTypes = {
  bgColor: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  rounded: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

Spacebox.defaultProps = {
  rounded: false,
};

export default Spacebox;
