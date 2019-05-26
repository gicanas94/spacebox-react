import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Box from '../../../components/Box';
import Button from '../../../components/Button';
import defaultUserImage from '../../../assets/images/default-user-image.png';
import { device } from '../../../styles';
import PostForm from '../../../forms/Post';
import { ROUTES } from '../../../constants';

const StyledFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.mobileL} {
    flex-direction: row;
  }

  @media ${device.tablet} {
    flex-direction: column;
  }
`;

const StyledUserImage = styled.img`
  background-color: ${({ theme }) => (
    theme.pages.Space.SpaceboxInfoSection.userImage.bgColor
  )};
  border-radius: ${({ theme }) => theme.global.borderRadius};
  height: auto;
  margin-bottom: 15px;
  overflow: hidden;
  width: 100%;

  @media ${device.mobileL} {
    height: 50%;
    margin-bottom: 0;
    margin-right: 15px;
    max-height: 200px;
    max-width: 200px;
  }

  @media ${device.tablet} {
    height: unset;
    margin-bottom: 15px;
    margin-right: 0;
    max-height: unset;
    max-width: unset;
    width: 100%;
  }
`;

const StyledSpaceboxTitle = styled.p`
  font-weight: ${({ theme }) => (
    theme.pages.Space.SpaceboxInfoSection.spaceboxTitle.fontWeight
  )};
  margin-bottom: 5px;
`;

const StyledSpaceboxDescription = styled.p`
  font-size: ${({ theme }) => (
    theme.pages.Space.SpaceboxInfoSection.spaceboxDescription.fontSize
  )};
  margin-bottom: 0;
`;

const StyledButtonWrapper = styled.div`
  margin-top: 15px;
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
  <Box padding="15px" margin="0">
    <StyledFlexWrapper>
      <StyledUserImage alt="User" src={defaultUserImage} />

      <div>
        <StyledSpaceboxTitle>
          {spacebox.title}
        </StyledSpaceboxTitle>

        <StyledSpaceboxDescription>
          {spacebox.description}
        </StyledSpaceboxDescription>
      </div>
    </StyledFlexWrapper>

    {page === 'space'
      && authUser
      && authUser.uid === spacebox.userId
      && (
        <StyledButtonWrapper>
          <PostForm spaceboxId={spaceboxId} />
        </StyledButtonWrapper>
      )}

    {page === 'post' && (
      <StyledButtonWrapper>
        {location.state
          ? (
            <Button
              fullWidth
              onClick={() => history.goBack()}
              rounded
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
      </StyledButtonWrapper>
    )}
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
