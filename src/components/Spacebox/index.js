import Color from 'color';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { Heart } from 'styled-icons/fa-solid';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors, devices, transitions } from '../../styles';

const StyledTitle = styled.div`
  display: -webkit-box;
  font-size: ${({ theme }) => theme.components.spacebox.title.fontSize};
  font-weight: ${({ theme }) => theme.components.spacebox.title.fontWeight};
  line-height: 1.3em;
  margin-bottom: -8px
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase;
  transition: blur ${transitions.speed.superfast} linear,
              opacity ${transitions.speed.superfast} linear;
  width: 100%;
  word-break: break-word;
  word-spacing: 5px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  @media ${devices.laptop} {
    bottom: 12px;
    padding: 0 12px;
    position: absolute;
    -webkit-line-clamp: 4;
  }
`;

const StyledDescription = styled.div`
  display: -webkit-box;
  font-size: ${({ theme }) => theme.components.spacebox.description.fontSize};
  font-weight: ${({ theme }) =>
    theme.components.spacebox.description.fontWeight};
  line-height: 1.2em;
  margin-bottom: -4px;
  overflow: hidden;
  transition: opacity ${transitions.speed.superfast} linear,
    visibility ${transitions.speed.superfast} linear;
  width: 100%;
  word-break: break-word;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;

  @media ${devices.laptop} {
    bottom: 12px;
    opacity: 0;
    padding: 0 12px;
    position: absolute;
    visibility: hidden;
    -webkit-line-clamp: 6;
  }
`;

const StyledBubblesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
  width: 100%;

  @media ${devices.laptop} {
    padding: 10px 10px 0 10px;
  }
`;

const StyledBubble = styled.div`
  border-radius: ${({ theme }) =>
    theme.components.spacebox.bubble.borderRadius};
  display: block;
  font-size: ${({ theme }) => theme.components.spacebox.bubble.fontSize};
  font-weight: ${({ theme }) => theme.components.spacebox.bubble.fontWeight};
  height: 28px;
  max-width: 50%;
  overflow: hidden;
  padding: 5px 5px 0 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledTotalLikesHeartIcon = styled(Heart)`
  color: ${({ theme }) => theme.components.spacebox.totalLikesHeartIcon.color};
  margin-right: 5px;
  width: 16px;
`;

const StyledSpacebox = styled.div`
  align-items: flex-start;
  background: ${({ bgColor }) => `
    linear-gradient(
      ${Color(bgColor).lighten(0.3).hex()},
      ${Color(bgColor).hex()}
    )
  `};
  border-color: ${({ bgColor }) =>
    Color(bgColor).isDark()
      ? Color(bgColor).lighten(0.3).hex()
      : Color(bgColor).darken(0.3).hex()};
  border-style: solid;
  border-width: ${({ theme }) => theme.components.spacebox.borderWidth};
  display: flex;
  flex-direction: column;
  height: 220px;
  justify-content: space-between;
  overflow: hidden;
  padding: 10px;
  position: relative;
  width: 100%;

  @media ${devices.laptop} {
    padding: 0;

    &:hover {
      ${({ description, theme }) =>
        description &&
        `
        ${StyledTitle} {
          filter: ${theme.components.spacebox.title.filterOnHover};
          opacity: 0.2;
        }

        ${StyledDescription} {
          opacity: 1;
          visibility: visible;
        }
      `}
    }
  }

  ${({ authUserIsTheOwner, theme }) =>
    authUserIsTheOwner &&
    `
    border: ${theme.components.spacebox.authUserIsTheOwner.border};
    height: 208px;
  `}

  ${({ informative, theme }) =>
    informative &&
    `
    background: linear-gradient(
      ${Color(theme.components.spacebox.informative.bgColor)
        .lighten(0.3)
        .hex()},
      ${Color(theme.components.spacebox.informative.bgColor).hex()}
    );
    border: ${theme.components.spacebox.informative.border};
    color: ${theme.components.spacebox.informative.color};
  `}

  ${({ order }) =>
    order &&
    `
    order: ${order};
  `}

  ${({ rounded, theme }) =>
    rounded &&
    `
    border-radius: ${theme.global.borderRadius};
  `}

  ${StyledBubble} {
    background-color: ${({ bgColor }) =>
      Color(bgColor).isDark()
        ? 'rgba(255, 255, 255, 0.7)'
        : 'rgba(0, 0, 0, 0.5)'};
    color: ${({ bgColor }) =>
      Color(bgColor).isDark() ? colors.palette.asphalt : colors.palette.cloud};
  }

  ${StyledTitle} {
    color: ${({ color }) => color};
  }

  ${StyledDescription} {
    color: ${({ color }) => color};
  }
`;

const StyledAuthUserIsTheOwnerWrapper = styled.div`
  background: ${({ theme }) =>
    theme.components.spacebox.authUserIsTheOwner.backgroundBorder};
  border: ${({ theme }) => theme.components.spacebox.authUserIsTheOwner.border};
  padding: 5px;

  ${({ rounded, theme }) =>
    rounded &&
    `
    border-radius: ${theme.global.borderRadius};
  `}
`;

const Spacebox = ({
  authUserIsTheOwner,
  category,
  description,
  informative,
  likes,
  onEditSpaceboxClickHandler,
  order,
  rounded,
  title,
  ...props
}) => {
  const box = (
    <StyledSpacebox
      authUserIsTheOwner={authUserIsTheOwner}
      description={description}
      informative={informative}
      order={order || undefined}
      rounded={rounded}
      {...props}
    >
      <StyledBubblesWrapper>
        {likes !== undefined && (
          <StyledBubble>
            <StyledTotalLikesHeartIcon />
            <FormattedNumber value={likes} />
          </StyledBubble>
        )}

        {category && (
          <StyledBubble>
            <FormattedMessage id={category} />
          </StyledBubble>
        )}
      </StyledBubblesWrapper>

      {title && (
        <StyledTitle>
          {informative ? (
            <FormattedMessage
              id={typeof title === 'object' ? title[0] : title}
              values={typeof title === 'object' ? title[1] : null}
            />
          ) : (
            title
          )}
        </StyledTitle>
      )}

      {description && <StyledDescription>{description}</StyledDescription>}
    </StyledSpacebox>
  );

  return (
    <>
      {authUserIsTheOwner ? (
        <StyledAuthUserIsTheOwnerWrapper rounded={rounded}>
          {box}
        </StyledAuthUserIsTheOwnerWrapper>
      ) : (
        box
      )}
    </>
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
  onEditSpaceboxClickHandler: PropTypes.func,
  order: PropTypes.number,
  rounded: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

Spacebox.defaultProps = {
  authUserIsTheOwner: false,
  bgColor: undefined,
  color: undefined,
  description: undefined,
  category: undefined,
  informative: false,
  likes: undefined,
  onEditSpaceboxClickHandler: () => false,
  order: undefined,
  rounded: true,
  title: undefined,
};

export default Spacebox;
