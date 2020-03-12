import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Box from '../Box';
import Button from '../Button';
import { device } from '../../styles';
import Hr from '../Hr';
import { ROUTES } from '../../constants';

const StyledSpaceboxTitle = styled.h1`
  color: inherit;
  font-size: ${({ theme }) => (
    theme.components.spaceboxInfoSection.spaceboxTitle.fontSize
  )};
  font-weight: ${({ theme }) => (
    theme.components.spaceboxInfoSection.spaceboxTitle.fontWeight
  )};
  line-height: 1;
`;

const StyledSpaceboxDescription = styled.h2`
  color: inherit;
  font-size: ${({ theme }) => (
    theme.components.spaceboxInfoSection.spaceboxDescription.fontSize
  )};
  font-weight: inherit;
`;

const StyledSpaceboxCategory = styled.div`
  font-size: ${({ theme }) => (
    theme.components.spaceboxInfoSection.spaceboxCategory.fontSize
  )};
  line-height: 1;
  margin-bottom: 0;

  span {
    font-weight: ${({ theme }) => (
      theme.components.spaceboxInfoSection.spaceboxCategory.titleFontWeight
    )};
  }
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledFirstChild = styled.div`
  width: 100%;
`;

const StyledSecondChild = styled.div`
  margin-top: 15px;
  width: 100%;
`;

const StyledLink = styled(Link)`
  display: inline;
  text-decoration: none !important;
  transform: none !important;
`;

const SpaceboxInfoSection = ({
  authUserIsTheOwner,
  history,
  location,
  page,
  spacebox,
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
      <span>
        <FormattedMessage id="components.spaceboxInfoSection.categoryTitle" />
      </span>

      <FormattedMessage id={spacebox.category} />
    </StyledSpaceboxCategory>

    <Hr centered margin="25px 0" width="50%" />

    <StyledButtonsWrapper>
      <StyledFirstChild>
        {authUserIsTheOwner
          ? (
            <StyledLink to={`${ROUTES.EDIT_SPACEBOX_BASE}/${spacebox.slug}`}>
              <Button
                color="royal"
                fullWidth
                size="small"
                styleType="filled"
                type="button"
              >
                {'components.spaceboxInfoSection.buttons.editSpacebox'}
              </Button>
            </StyledLink>
          ) : (
            <StyledLink to={{
              pathname: `${ROUTES.USER_BASE}/${user.slug}`,
              state: {
                user: {
                  ...user,
                  uid: spacebox.uid,
                },
              },
            }}
            >
              <Button
                fullWidth
                size="small"
                styleType="filled"
                type="button"
              >
                {'components.spaceboxInfoSection.buttons.userProfile'}
              </Button>
            </StyledLink>
          )
        }
      </StyledFirstChild>

      {page === 'post' && (
        <StyledSecondChild>
          {location.state
            ? (
              <Button
                color="emerald"
                fullWidth
                onClick={() => history.goBack()}
                size="large"
                styleType="filled"
                type="button"
              >
                {'components.spaceboxInfoSection.buttons.goBack'}
              </Button>
            ) : (
              <StyledLink to={{
                pathname: `${ROUTES.SPACE_BASE}/${spacebox.slug}`,
                state: { spacebox },
              }}
              >
                <Button
                  color="emerald"
                  fullWidth
                  size="large"
                  styleType="filled"
                  type="button"
                >
                  {'components.spaceboxInfoSection.buttons.goToSpacebox'}
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
  authUserIsTheOwner: PropTypes.bool,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  page: PropTypes.oneOf(['space', 'post']).isRequired,
  spacebox: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

SpaceboxInfoSection.defaultProps = {
  authUserIsTheOwner: false,
};

export default SpaceboxInfoSection;
