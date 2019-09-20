import Color from 'color';
import { Edit } from 'styled-icons/boxicons-regular/Edit';
import { Heart } from 'styled-icons/fa-solid/Heart';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import colors from '../../styles/color';
import { transition } from '../../styles';

const StyledTitle = styled.div`
  font-size: ${({ theme }) => theme.components.Spacebox.title.fontSize};
  font-weight: ${({ theme }) => theme.components.Spacebox.title.fontWeight};
  line-height: 1em;
  max-height: 4em;
  overflow: hidden;
  padding-left: 15px;
  padding-right: 45px;
  position: absolute
  text-transform: uppercase;
  transition: blur ${transition.speed.superfast} linear,
              opacity ${transition.speed.superfast} linear;
  width: 100%;
  word-spacing: 5px;
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
  font-size: ${({ theme }) => theme.components.Spacebox.description.fontSize};
  font-weight: ${({ theme }) => (
    theme.components.Spacebox.description.fontWeight
  )};
  line-height: 1em;
  max-height: 8em;
  opacity: 0;
  overflow: hidden;
  padding-left: 10px;
  padding-right: 25px;
  position: absolute;
  transition: opacity ${transition.speed.superfast} linear,
              visibility ${transition.speed.superfast} linear;
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
  display: flex;
  justify-content: space-between;
  padding: 7px;
  position: absolute;
  top: 0;
  width: 100%;
`;

const StyledBubble = styled.div`
  align-items: center;
  border-radius: ${({ theme }) => (
    theme.components.Spacebox.bubble.borderRadius
  )};
  display: flex;
  font-size: ${({ theme }) => theme.components.Spacebox.bubble.fontSize};
  font-weight: ${({ theme }) => theme.components.Spacebox.bubble.fontWeight};
  height: 25px;
  padding: 0 5px;
`;

const StyledLeftBubblesWrapper = styled.div`
  display: flex;

  & > ${StyledBubble} {
    margin-right: 7px;
  }

  & > ${StyledBubble}:last-child {
    margin-right: 0;
  }
`;

const StyledTotalLikesHeartIcon = styled(Heart)`
  color: ${({ theme }) => theme.components.Spacebox.totalLikesHeartIconColor};
  width: 16px;
  margin-right: 5px;
`;

const StyledEditSpaceboxIcon = styled(Edit)`
  width: 20px;
`;

const StyledEditSpaceboxIconBubble = styled(StyledBubble)`
  &:hover {
    ${StyledEditSpaceboxIcon} {
      transform: scale(1.1);
    }
  }

  &:active {
    ${StyledEditSpaceboxIcon} {
      transform: scale(0.97);
    }
  }
`;

const StyledSpacebox = styled.div`
  align-items: flex-end;
  background: ${({ bgColor }) => `
    linear-gradient(
      ${Color(bgColor).lighten(0.3).hex()},
      ${Color(bgColor).hex()}
    )
  `};
  border-color: ${({ bgColor }) => (
    Color(bgColor).isDark()
      ? Color(bgColor).lighten(0.3).hex()
      : Color(bgColor).darken(0.3).hex()
  )};
  border-style: solid;
  border-width: ${({ theme }) => theme.components.Spacebox.borderWidth};
  display: flex;
  height: 220px;
  justify-content: center;
  overflow: hidden;
  padding-bottom: 7px;
  position: relative;
  width: 100%;

  &:hover {
    ${({ description }) => description && `
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

  ${({ authUserIsTheOwner, theme }) => authUserIsTheOwner && `
    border: ${theme.components.Spacebox.authUserIsTheOwner.border};
    height: 208px;
  `}

  ${({ informative, theme }) => informative && `
    background: linear-gradient(
      ${Color(
        theme.components.Spacebox.informative.bgColor,
      ).lighten(0.3).hex()},
      ${Color(theme.components.Spacebox.informative.bgColor).hex()}
    );
    border: ${theme.components.Spacebox.informative.border};
    color: ${theme.components.Spacebox.informative.color};
  `}

  ${({ order }) => order && `
    order: ${order};
  `}

  ${({ rounded, theme }) => rounded && `
    border-radius: ${theme.global.borderRadius};
  `}

  ${StyledBubble} {
    background-color: ${({ bgColor }) => (
      Color(bgColor).isDark()
        ? 'rgba(255, 255, 255, 0.7)'
        : 'rgba(0, 0, 0, 0.5)'
    )};
    color: ${({ bgColor }) => (
      Color(bgColor).isDark()
        ? colors.palette.asphalt
        : colors.palette.cloud
    )};
  }

  ${StyledTitle} {
    color: ${({ color }) => color};

    &:after {
      background-color: ${({ bgColor, informative, theme }) => (
        informative
          ? theme.components.Spacebox.informative.bgColor
          : bgColor
      )};
    }
  }

  ${StyledDescription} {
    color: ${({ color }) => color};

    &:after {
      background-color: ${({ bgColor, informative, theme }) => (
        informative
          ? theme.components.Spacebox.informative.bgColor
          : bgColor
      )};
    }
  }
`;

const StyledLink = styled(Link)`
  order: ${({ order }) => order};
`;

const StyledAuthUserIsTheOwnerWrapper = styled.div`
  background: ${({ theme }) => (
    theme.components.Spacebox.authUserIsTheOwner.backgroundBorder
  )};
  border: ${({ theme }) => theme.components.Spacebox.authUserIsTheOwner.border};
  padding: 5px;
`;

const Spacebox = ({
  authUserIsTheOwner,
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
      authUserIsTheOwner={authUserIsTheOwner}
      description={description}
      order={!link ? order : undefined}
      {...props}
    >
      <StyledBubblesWrapper>
        <StyledLeftBubblesWrapper>
          {likes !== undefined && (
            <StyledBubble>
              <StyledTotalLikesHeartIcon />
              {likes}
            </StyledBubble>
          )}

          {authUserIsTheOwner && (
            <StyledEditSpaceboxIconBubble>
              <StyledEditSpaceboxIcon />
            </StyledEditSpaceboxIconBubble>
          )}
        </StyledLeftBubblesWrapper>

        {category && <StyledBubble>{category}</StyledBubble>}
      </StyledBubblesWrapper>

      {title && <StyledTitle>{title}</StyledTitle>}

      {description && <StyledDescription>{description}</StyledDescription>}
    </StyledSpacebox>
  );

  return (
    link
      ? (
        <StyledLink
          order={order}
          to={{
            pathname: link[0],
            state: { spacebox: link[1] },
          }}
        >
          {authUserIsTheOwner
            ? (
              <StyledAuthUserIsTheOwnerWrapper>
                {box}
              </StyledAuthUserIsTheOwnerWrapper>
            ) : box}
        </StyledLink>
      )
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
  link: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
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
