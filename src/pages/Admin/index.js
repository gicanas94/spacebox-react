import { compose } from 'recompose';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Box from '../../components/Box';
import { device } from '../../styles';
import HelmetTitle from '../../components/HelmetTitle';
import Sidebar from '../../components/Sidebar';
import { withAuthorization } from '../../Session';
import { withFirebase } from '../../Firebase';

const StyledGrid = styled.div`
  align-items: start;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;
  margin: auto;
  max-width: 900px;
  width: 100%;

  @media ${device.tablet} {
    grid-template-columns: auto 1fr;
  }

  @media ${device.laptop} {
    grid-gap: 20px;
    max-width: 910px;
  }
`;

const AdminPage = () => {
  const sidebarContent = (
    [
      {
        heading: 'pages.admin.sidebarContent.section1.heading',
        links: [
          {
            text: 'pages.admin.sidebarContent.section1.links.listOfUsers',
            to: '#',
          },
          {
            text: 'pages.admin.sidebarContent.section1.links.findUser',
            to: '#',
          },
        ],
        separator: true,
      },
      {
        heading: 'pages.admin.sidebarContent.section2.heading',
        links: [
          {
            text: 'pages.admin.sidebarContent.section2.links.listOfSpaceboxes',
            to: '#',
          },
          {
            text: 'pages.admin.sidebarContent.section2.links.findSpacebox',
            to: '#',
          },
        ],
      },
    ]
  );

  return (
    <StyledGrid>
      <HelmetTitle title={{ id: 'pages.admin.title' }} />

      <Sidebar content={sidebarContent} />

      <Box fullWidth margin="0">
        <Switch>
          <Route />
          <Route />
          <Route />
          <Route />
        </Switch>
      </Box>
    </StyledGrid>
  );
};

const condition = authUser => authUser && authUser.isAdmin;

export default compose(withAuthorization(condition), withFirebase)(AdminPage);
