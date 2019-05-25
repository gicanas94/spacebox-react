import { compose } from 'recompose';
import { Helmet } from 'react-helmet';
import React from 'react';
import styled from 'styled-components';

import Box from '../../components/Box';
import CreateSpaceboxForm from '../../forms/CreateSpacebox';
import { device } from '../../styles';
import { withAuthorization, withEmailVerification } from '../../Session';

const StyledGrid = styled.div`
  align-items: start;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;
  margin: auto;
  max-width: 720px;
  width: 100%;

  @media ${device.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${device.laptop} {
    grid-gap: 20px;
  }
`;

const StyledText = styled.p`
  font-size: ${({ theme }) => theme.pages.CreateSpacebox.infoText.fontSize};

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const CreateSpaceboxPage = () => (
  <StyledGrid>
    <Helmet title="Create Spacebox - Spacebox" />

    <Box fullWidth margin="0">
      <StyledText>
        You can create your own Spacebox in just three steps!
      </StyledText>

      <h4>Step 1: colors</h4>

      <StyledText>
        Background and Text color of the box. We recommend you to choose
        combination of colors that are pleasing to the eye, with contrast and
        not very garish.
      </StyledText>

      <h4>Step 2: title and description</h4>

      <StyledText>
        Keep in mind that if the title or description of your space is too long,
        it will not be shown completely.
      </StyledText>

      <h4>Step 3: category and visible</h4>

      <StyledText>
        Choose carefully the category of your Spacebox, since in case you decide
        that it is visible on the home page, other users will filter by category
        to quickly find what they want to read.
      </StyledText>
    </Box>

    <Box fullWidth margin="0">
      <h2>Create Spacebox</h2>
      <CreateSpaceboxForm />
    </Box>
  </StyledGrid>
);

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
  withEmailVerification,
)(CreateSpaceboxPage);
