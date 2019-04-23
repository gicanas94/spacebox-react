import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Box from '../../components/Box';
import { device } from '../../styles';
import Spacebox from '../../components/Spacebox';

const StyledWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto;
  width: 100%;

  @media ${device.mobileL} {
    grid-template-columns: repeat(2, auto);
  }

  @media ${device.tablet} {
    grid-template-columns: repeat(3, auto);
  }

  @media ${device.laptop} {
    grid-template-columns: repeat(4, auto);
  }

  @media ${device.laptopL} {
    grid-template-columns: repeat(5, auto);
  }

  @media ${device.desktop} {
    grid-template-columns: repeat(6, auto);
  }

  @media ${device.desktopL} {
    grid-template-columns: repeat(8, auto);
  }
`;

const HomePage = ({ spaceboxes }) => (
  <Box size="small">
    <Helmet>
      <title>Home - Spacebox</title>
    </Helmet>

    😍
  </Box>
);

// HomePage.propTypes = {
//   spaceboxes: PropTypes.arrayOf(PropTypes.object).isRequired,
// };

export default HomePage;
