import _ from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { alertSet } from '../../Redux/actions';
import Box from '../../components/Box';
import ChangePasswordSubpage from './ChangePassword';
import { device } from '../../styles';
import LoginManagementSubpage from './LoginManagement';
import { ROUTES } from '../../constants';
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

const AccountPage = ({ alertSetAction, authUser, firebase }) => {
  let authUserHasPassword = null;

  const sidebarContent = [
    {
      title: 'Account',
      links: [],
    },
  ];

  _.map(authUser.providerData, (provider) => {
    if (provider.providerId === 'password') {
      authUserHasPassword = true;

      sidebarContent[0].links.push({
        text: 'Change password',
        to: ROUTES.CHANGE_PASSWORD,
      });
    }
  });

  sidebarContent[0].links.push({
    text: 'Login management',
    to: ROUTES.LOGIN_MANAGEMENT,
  });

  return (
    <StyledGrid>
      <Sidebar content={sidebarContent} />

      <Box size="small">
        <Switch>
          {authUserHasPassword && (
            <Route
              path={ROUTES.CHANGE_PASSWORD}
              render={() => (
                <ChangePasswordSubpage
                  alertSetAction={alertSetAction}
                  authUser={authUser}
                  firebase={firebase}
                />
              )}
            />
          )}

          <Route
            path={ROUTES.LOGIN_MANAGEMENT}
            render={() => (
              <LoginManagementSubpage
                alertSetAction={alertSetAction}
                authUser={authUser}
                firebase={firebase}
              />
            )}
          />
        </Switch>
      </Box>
    </StyledGrid>
  );
};

AccountPage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.objectOf(PropTypes.any).isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
};

const condition = authUser => !!authUser;

const mapStateToProps = state => ({ authUser: state.session.authUser });

const mapDispatchToProps = { alertSetAction: alertSet };

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthorization(condition),
  withFirebase,
)(AccountPage);
