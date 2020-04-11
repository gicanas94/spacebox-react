import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { /* Route, Switch, */ withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { alertSet, isLoadingSet } from '../../Redux/actions';
import Box from '../../components/Box';
import { device } from '../../styles';
import HelmetTitle from '../../components/HelmetTitle';
import { ROUTES } from '../../constants';
import Sidebar from '../../components/Sidebar';
import { withAuthorization } from '../../Session';
import { withFirebase } from '../../Firebase';

const StyledMainGrid = styled.div`
  align-items: start;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;
  margin: auto;
  width: 100%;

  @media ${device.tablet} {
    grid-template-columns: 250px 430px;
    width: fit-content;
  }

  @media ${device.laptop} {
    grid-gap: 20px;
  }
`;

const StyledSidebarWrapper = styled.div`
  @media ${device.tablet} {
    position: sticky;
    top: 70px;
  }

  @media ${device.laptop} {
    top: 75px;
  }
`;

const StyledContentGrid = styled.div`
  align-items: start;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;
  margin: 0;
  width: 100%;

  @media ${device.laptop} {
    grid-gap: 20px;
  }
`;

const AdminPage = ({
  alertSetAction,
  authUser,
  firebase,
  history,
  isLoading,
  isLoadingSetAction,
}) => {
  const sidebarContent = (
    [
      {
        heading: 'pages.admin.sidebarContent.section1.heading',
        links: [
          {
            text: 'pages.admin.sidebarContent.section1.links.listOfUsers',
            to: '#',
            visible: true,
          },
          {
            text: 'pages.admin.sidebarContent.section1.links.findUser',
            to: '#',
            visible: true,
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
            visible: true,
          },
          {
            text: 'pages.admin.sidebarContent.section2.links.findSpacebox',
            to: '#',
            visible: true,
          },
        ],
        separator: true,
      },
      {
        heading: 'pages.admin.sidebarContent.section3.heading',
        links: [
          {
            text: 'pages.admin.sidebarContent.section3.links.newGlobalMessage',
            to: '#',
            visible: true,
          },
          {
            text: 'pages.admin.sidebarContent.section3.links.allGlobalMessages',
            to: '#',
            visible: true,
          },
        ],
      },
    ]
  );

  const [authUserIsAdmin, setAuthUserIsAdmin] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        alertSetAction();
        isLoadingSetAction(true);

        const userRestrictedData = await firebase.userRestrictedData(
          authUser.uid,
        ).get();

        if (userRestrictedData.data().isAdmin) {
          setAuthUserIsAdmin(true);
        } else {
          history.push(ROUTES.HOME);
        }
      } catch (error) {
        alertSetAction({
          message: error.message,
          type: 'danger',
        });

        history.push(ROUTES.HOME);
      } finally {
        isLoadingSetAction(false);
      }
    })();
  }, []);

  return (
    <Fragment>
      {!isLoading && authUserIsAdmin && (
        <StyledMainGrid>
          <HelmetTitle title={{ id: 'pages.admin.title' }} />

          <StyledSidebarWrapper>
            <Sidebar content={sidebarContent} />
          </StyledSidebarWrapper>

          <StyledContentGrid>
            <Box fullWidth id="same as link">

            </Box>

            <Box fullWidth id="same as link">

            </Box>

            <Box fullWidth id="same as link">

            </Box>
          </StyledContentGrid>
        </StyledMainGrid>
      )}
    </Fragment>
  );
};

AdminPage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoadingSetAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.isLoading,
});

const mapDispatchToProps = {
  alertSetAction: alertSet,
  isLoadingSetAction: isLoadingSet,
};

const condition = authUser => !!authUser;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthorization(condition),
  withFirebase,
  withRouter,
)(AdminPage);
