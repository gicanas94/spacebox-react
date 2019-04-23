import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
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

const AccountPage = ({ alertSetAction, authUser }) => {
  const sidebarContent = (
    [
      {
        title: 'Account',
        links: [
          {
            text: 'Change password',
            to: ROUTES.CHANGE_PASSWORD,
          },
          {
            text: 'Login management',
            to: ROUTES.LOGIN_MANAGEMENT,
          },
        ],
      },
    ]
  );

  return (
    <StyledGrid>
      <Helmet>
        <title>Account - Spacebox</title>
      </Helmet>

      <Sidebar content={sidebarContent} />

      <Box fullWidth padding="0">
        <Switch>
          <Route
            component={ChangePasswordSubpage}
            path={ROUTES.CHANGE_PASSWORD}
          />

          <Route
            render={() => (
              <LoginManagementSubpage
                alertSetAction={alertSetAction}
                authUser={authUser}
              />
            )}
            path={ROUTES.LOGIN_MANAGEMENT}
          />
        </Switch>
      </Box>
    </StyledGrid>
  );
};

AccountPage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.objectOf(PropTypes.any).isRequired,
};

const condition = authUser => !!authUser;

const mapStateToProps = state => ({ authUser: state.session.authUser });

const mapDispatchToProps = { alertSetAction: alertSet };

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthorization(condition),
)(AccountPage);
