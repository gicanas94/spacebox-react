import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import styled from 'styled-components';

import Box from '../../../components/Box';
import Button from '../../../components/Button';
import defaultUserImage from '../../../assets/images/default-user-image.png';
import PostForm from '../../../forms/Post';
import { ROUTES } from '../../../constants';

const StyledImgWrapper = styled.div`
  background-color: ${props => props.theme.pages.Space.userImage.bgColor};
  border-radius: ${props => props.theme.global.borderRadius};
  height: 240px;
  margin-bottom: 25px;
  overflow: hidden;
  width: 240px;

  img {
    height: inherit;
    width: inherit;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none !important;
`;

const UserInfoSection = ({
  authUser,
  history,
  location,
  page,
  spacebox,
  spaceboxId,
  user,
}) => (
  <Box margin="0 0 10px 0" padding="15px">
    <StyledImgWrapper>
      <img alt="User" src={defaultUserImage} />
    </StyledImgWrapper>

    {page === 'space'
      && authUser
      && authUser.uid === spacebox.userId
      && (
        <PostForm spaceboxId={spaceboxId} />
      )}

    {page === 'post' && (
      <Fragment>
        {location.state
          ? (
            <Button
              fullWidth
              onClick={() => history.goBack()}
              rounded
              styleType="filled"
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
              >
                {'Go to Spacebox'}
              </Button>
            </StyledLink>
          )
        }
      </Fragment>
    )}
  </Box>
);

UserInfoSection.propTypes = {
  authUser: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  page: PropTypes.oneOf(['space', 'post']).isRequired,
  spacebox: PropTypes.objectOf(PropTypes.any).isRequired,
  spaceboxId: PropTypes.string.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

UserInfoSection.defaultProps = {
  authUser: null,
};

export default withRouter(UserInfoSection);
