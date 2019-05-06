import { compose } from 'recompose';
import { Helmet } from 'react-helmet';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Box from '../../components/Box';
import { device } from '../../styles';
import Sidebar from '../../components/Sidebar';
import { withAuthorization } from '../../Session';
import { withFirebase } from '../../Firebase';

const StyledGrid = styled.div`
  align-items: start;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;
  margin: auto;
  width: 100%;

  @media ${device.tablet} {
    grid-template-columns: repeat(2, 1fr);
    width: min-content;
  }

  @media ${device.laptop} {
    grid-gap: 20px;
  }
`;

const AdminPage = () => {
  const sidebarContent = (
    [
      {
        title: 'User(s)',
        links: [
          {
            text: 'List of users',
            to: '#',
          },
          {
            text: 'Find user',
            to: '#',
          },
        ],
        separator: true,
      },
      {
        title: 'Spacebox(es)',
        links: [
          {
            text: 'List of Spaceboxes',
            to: '#',
          },
          {
            text: 'Find Spacebox',
            to: '#',
          },
        ],
      },
    ]
  );

  return (
    <StyledGrid>
      <Helmet title="Admin - Spacebox" />

      <Sidebar content={sidebarContent} />

      <Box fullWidth padding="0">
        <Switch>
          <Route />
          <Route />
        </Switch>
      </Box>
    </StyledGrid>
  );
};

const condition = authUser => authUser && authUser.isAdmin;

export default compose(
  withAuthorization(condition),
  withFirebase,
)(AdminPage);
