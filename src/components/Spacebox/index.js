import Color from 'color';
import { Heart } from 'styled-icons/fa-solid/Heart';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { color, transition } from '../../styles';

const StyledTitle = styled.div`
  font-size: ${props => props.theme.components.Spacebox.title.fontSize};
  font-weight: ${props => props.theme.components.Spacebox.title.fontWeight};
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
  font-size: ${props => props.theme.components.Spacebox.description.fontSize};
  font-weight: ${props => (
    props.theme.components.Spacebox.description.fontWeight
  )};
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
  border-radius: ${props => (
    props.theme.components.Spacebox.bubble.borderRadius
  )};
  display: flex;
  font-size: ${props => props.theme.components.Spacebox.bubble.fontSize};
  font-weight: ${props => props.theme.components.Spacebox.bubble.fontWeight};
  height: 25px;
  padding: 0 5px;
`;

const StyledHeart = styled(Heart)`
  color: ${props => props.theme.components.Spacebox.heartColor};
  filter: none !important;
  width: 16px;
  margin-right: 5px;
`;

const StyledSpacebox = styled.div`
  align-items: flex-end;
  background: ${props => `
    linear-gradient(
      ${Color(props.bgColor).lighten(0.3).hex()},
      ${Color(props.bgColor).hex()}
    )
  `};
  border-color: ${props => (
    Color(props.bgColor).isDark()
      ? Color(props.bgColor).lighten(0.3).hex()
      : Color(props.bgColor).darken(0.3).hex()
  )};
  border-style: solid;
  border-width: ${props => props.theme.components.Spacebox.borderWidth};
  display: flex;
  height: 220px;
  justify-content: center;
  overflow: hidden;
  padding-bottom: 7px;
  position: relative;
  width: 100%;

  &:hover {
    ${props => props.description && `
      ${StyledTitle} {
        filter: blur(4px);
        opacity: 0.2;
      }

      ${StyledDescription} {
        opacity: 1;
        visibility: visible;
      }
    `}
  }

  ${props => props.authUserIsTheOwner && `
    border: ${props.theme.components.Spacebox.authUserIsTheOwner.border};
  `}

  ${props => props.informative && `
    background: linear-gradient(
      ${Color(
        props.theme.components.Spacebox.informative.bgColor,
      ).lighten(0.3).hex()},
      ${Color(props.theme.components.Spacebox.informative.bgColor).hex()}
    );
    border: ${props.theme.components.Spacebox.informative.border};
    color: ${props.theme.components.Spacebox.informative.color};
  `}

  ${props => props.order && `
    order: ${props.order};
  `}

  ${props => props.rounded && `
    border-radius: ${props.theme.global.borderRadius};
  `}

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
      background-color: ${props => (
        props.informative
          ? props.theme.components.Spacebox.informative.bgColor
          : props.bgColor
      )};
    }
  }

  ${StyledDescription} {
    color: ${props => props.color};

    &:after {
      background-color: ${props => (
        props.informative
          ? props.theme.components.Spacebox.informative.bgColor
          : props.bgColor
      )};
    }
  }
`;

const StyledLink = styled(Link)`
  order: ${props => props.order};
`;

const Spacebox = ({
  category,
  description,
  order,
  likes,
  link,
  title,
  ...props
}) => {
  const box = (
    <StyledSpacebox
      description={description}
      order={!link ? order : undefined}
      {...props}
    >
      <StyledBubblesWrapper>
        {likes !== undefined && (
          <StyledBubble>
            <StyledHeart />
            {likes}
          </StyledBubble>
        )}

        {category && <StyledBubble>{category}</StyledBubble>}
      </StyledBubblesWrapper>

      {title && <StyledTitle>{title}</StyledTitle>}

      {description && <StyledDescription>{description}</StyledDescription>}
    </StyledSpacebox>
  );

  return (
    link
      ? <StyledLink order={order} to={link}>{box}</StyledLink>
      : box
  );
};

Spacebox.propTypes = {
  authUserIsTheOwner: PropTypes.bool,
  bgColor: PropTypes.string,
  category: PropTypes.string,
  color: PropTypes.string,
  description: PropTypes.string,
  informative: PropTypes.bool,
  likes: PropTypes.number,
  link: PropTypes.string,
  order: PropTypes.number,
  rounded: PropTypes.bool,
  title: PropTypes.string,
};

Spacebox.defaultProps = {
  authUserIsTheOwner: false,
  bgColor: undefined,
  color: undefined,
  description: undefined,
  category: undefined,
  informative: false,
  likes: undefined,
  link: undefined,
  order: undefined,
  rounded: false,
  title: undefined,
};

export default Spacebox;
