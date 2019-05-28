import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Box from '../../../components/Box';
import Button from '../../../components/Button';
import { device } from '../../../styles';
import Hr from '../../../components/Hr';
import PostForm from '../../../forms/Post';
import { ROUTES } from '../../../constants';

const StyledSpaceboxTitle = styled.h1`
  color: inherit;
  font-size: ${({ theme }) => (
    theme.pages.Space.SpaceboxInfoSection.spaceboxTitle.smallFontSize
  )};
  font-weight: ${({ theme }) => (
    theme.pages.Space.SpaceboxInfoSection.spaceboxTitle.fontWeight
  )};
  line-height: 1;
  margin-bottom: 5px;

  @media ${device.mobileL} {
    font-size: ${({ theme }) => (
      theme.pages.Space.SpaceboxInfoSection.spaceboxTitle.largeFontSize
    )};
  }

  @media ${device.tablet} {
    font-size: ${({ theme }) => (
      theme.pages.Space.SpaceboxInfoSection.spaceboxTitle.smallFontSize
    )};
  }
`;

const StyledSpaceboxDescription = styled.p`
  font-size: ${({ theme }) => (
    theme.pages.Space.SpaceboxInfoSection.spaceboxDescription.fontSize
  )};
  margin-bottom: 15px;
`;

const StyledSpaceboxCategory = styled.p`
  font-size: ${({ theme }) => (
    theme.pages.Space.SpaceboxInfoSection.spaceboxCategory.fontSize
  )};
  line-height: 1;
  margin: 0;

  span {
    font-weight: ${({ theme }) => (
      theme.pages.Space.SpaceboxInfoSection.spaceboxCategory.titleFontWeight
    )};
  }
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media ${device.mobileL} {
    flex-direction: row;
    align-items: flex-end;
  }

  @media ${device.tablet} {
    flex-direction: column;
  }
`;

const StyledFirstChild = styled.div`
  @media ${device.tablet} {
    width: 100%;
  }
`;

const StyledSecondChild = styled.div`
  margin-top: 15px;

  @media ${device.mobileL} {
    margin-top: 0;
  }

  @media ${device.tablet} {
    margin-top: 15px;
    width: 100%;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none !important;
`;

const SpaceboxInfoSection = ({
  authUser,
  history,
  location,
  page,
  spacebox,
  spaceboxId,
  user,
}) => (
  <Box margin="0" padding="15px">
    <StyledSpaceboxTitle>
      {spacebox.title}
    </StyledSpaceboxTitle>

    <StyledSpaceboxDescription>
      {spacebox.description}
    </StyledSpaceboxDescription>

    <StyledSpaceboxCategory>
      <span>Category: </span>
      {spacebox.category}
    </StyledSpaceboxCategory>

    <Hr centered margin="25px 0" width="50%" />

    <StyledButtonsWrapper>
      <StyledFirstChild>
        <StyledLink to={{
          pathname: `${ROUTES.USER_BASE}/${user.slug}`,
          state: {
            user,
            userId: spacebox.userId,
          },
        }}
        >
          <Button
            fullWidth
            rounded
            size="small"
            styleType="filled"
            type="button"
          >
            {'Go to user profile'}
          </Button>
        </StyledLink>
      </StyledFirstChild>

      {page === 'space'
        && authUser
        && authUser.uid === spacebox.userId
        && (
          <StyledSecondChild>
            <PostForm spaceboxId={spaceboxId} />
          </StyledSecondChild>
        )}

      {page === 'post' && (
        <StyledSecondChild>
          {location.state
            ? (
              <Button
                fullWidth
                onClick={() => history.goBack()}
                rounded
                size="small"
                styleType="filled"
                type="button"
              >
                {'Go back to Spacebox'}
              </Button>
            ) : (
              <StyledLink to={{
                pathname: `${ROUTES.SPACE_BASE}/${spacebox.slug}`,
                state: { spacebox, spaceboxId },
              }}
              >
                <Button
                  fullWidth
                  rounded
                  styleType="filled"
                  type="button"
                >
                  {'Go to Spacebox'}
                </Button>
              </StyledLink>
            )
          }
        </StyledSecondChild>
      )}
    </StyledButtonsWrapper>
  </Box>
);

SpaceboxInfoSection.propTypes = {
  authUser: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  page: PropTypes.oneOf(['space', 'post']).isRequired,
  spacebox: PropTypes.objectOf(PropTypes.any).isRequired,
  spaceboxId: PropTypes.string.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

SpaceboxInfoSection.defaultProps = {
  authUser: null,
};

export default withRouter(SpaceboxInfoSection);
