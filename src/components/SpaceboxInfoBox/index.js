import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Box from '../Box';

const StyledSpaceboxTitle = styled.h1`
  color: inherit;
  font-size: ${({ theme }) => (
    theme.components.spaceboxInfoBox.spaceboxTitle.fontSize
  )};
  font-weight: ${({ theme }) => (
    theme.components.spaceboxInfoBox.spaceboxTitle.fontWeight
  )};
  line-height: 1;
`;

const StyledSpaceboxDescription = styled.h2`
  color: inherit;
  font-size: ${({ theme }) => (
    theme.components.spaceboxInfoBox.spaceboxDescription.fontSize
  )};
  font-weight: inherit;
`;

const StyledSpaceboxCategory = styled.div`
  font-size: ${({ theme }) => (
    theme.components.spaceboxInfoBox.spaceboxCategory.fontSize
  )};
  line-height: 1;
  margin-bottom: 0;

  span {
    font-weight: ${({ theme }) => (
    theme.components.spaceboxInfoBox.spaceboxCategory.titleFontWeight
  )};
  }
`;

const SpaceboxInfoBox = ({ spacebox }) => (
  <Box margin="0" padding="15px">
    <StyledSpaceboxTitle>
      {spacebox.title}
    </StyledSpaceboxTitle>

    <StyledSpaceboxDescription>
      {spacebox.description}
    </StyledSpaceboxDescription>

    <StyledSpaceboxCategory>
      <span>
        <FormattedMessage id="components.spaceboxInfoBox.categoryTitle" />
      </span>

      <FormattedMessage id={spacebox.category} />
    </StyledSpaceboxCategory>
  </Box>
);

SpaceboxInfoBox.propTypes = {
  spacebox: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SpaceboxInfoBox;
