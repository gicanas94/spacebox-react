import Color from 'color';
import { Edit } from 'styled-icons/boxicons-regular/Edit';
import { Heart } from 'styled-icons/fa-solid/Heart';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import colors from '../../styles/color';
import { device, transition } from '../../styles';

const StyledTitle = styled.div`
  display: -webkit-box;
  font-size: ${({ theme }) => theme.components.Spacebox.title.fontSize};
  font-weight: ${({ theme }) => theme.components.Spacebox.title.fontWeight};
  line-height: 1em;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase;
  transition: blur ${transition.speed.superfast} linear,
              opacity ${transition.speed.superfast} linear;
  width: 100%;
  word-spacing: 5px;
  word-wrap: break-word;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  @media ${device.laptop} {
    bottom: 7px;
    padding: 0 10px;
    position: absolute;
    -webkit-line-clamp: 4;
  }
`;

const StyledDescription = styled.div`
  display: -webkit-box;
  font-size: ${({ theme }) => theme.components.Spacebox.description.fontSize};
  font-weight: ${({ theme }) => (
    theme.components.Spacebox.description.fontWeight
  )};
  line-height: 1em;
  overflow: hidden;
  transition: opacity ${transition.speed.superfast} linear,
              visibility ${transition.speed.superfast} linear;
  width: 100%;
  word-wrap: break-word;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;

  @media ${device.laptop} {
    bottom: 7px;
    opacity: 0;
    padding: 0 10px;
    position: absolute;
    visibility: hidden;
    -webkit-line-clamp: 8;
  }
`;

const StyledBubblesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media ${device.laptop} {
    padding: 7px 7px 0 7px;
  }
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
  transition: transform ${transition.speed.superfast} linear;
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
  align-items: flex-start;
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
  flex-direction: column;
  height: 220px;
  justify-content: space-between;
  overflow: hidden;
  padding: 7px;
  position: relative;
  width: 100%;

  @media ${device.laptop} {
    padding: 0;

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
  }

  ${StyledDescription} {
    color: ${({ color }) => color};
  }
`;

const StyledLink = styled(Link)`
  order: ${({ order }) => order};
  text-decoration: none !important;
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
  onEditSpaceboxClickHandler,
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
            <StyledEditSpaceboxIconBubble onClick={
              (event) => {
                event.preventDefault();
                onEditSpaceboxClickHandler();
              }}
            >
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
  onEditSpaceboxClickHandler: PropTypes.func,
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
  onEditSpaceboxClickHandler: () => false,
  order: undefined,
  rounded: false,
  title: undefined,
};

export default Spacebox;
