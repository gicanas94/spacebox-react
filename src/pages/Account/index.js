import { compose } from 'recompose';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { alertSet, loadingSet } from '../../Redux/actions';
import Box from '../../components/Box';
import ChangePasswordSubpage from './ChangePassword';
import { device } from '../../styles';
import HelmetTitle from '../../components/HelmetTitle';
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

const AccountPage = ({
  alertSetAction,
  authUser,
  firebase,
  isLoading,
  loadingSetAction,
}) => {
  const sidebarContent = [
    {
      heading: 'pages.account.sidebarContent.section1.heading',
      links: [
        {
          text: 'pages.account.sidebarContent.section1.links.general',
          to: ROUTES.ACCOUNT_BASE,
        },
        {
          text: 'pages.account.sidebarContent.section1.links.changePassword',
          to: ROUTES.ACCOUNT_CHANGE_PASSWORD,
        },
        {
          text: 'pages.account.sidebarContent.section1.links.loginManagement',
          to: ROUTES.ACCOUNT_LOGIN_MANAGEMENT,
        },
      ],
    },
  ];

  const [authUserHasPassword, setAuthUserHasPassword] = useState(false);
  const [activeSignInMethods, setActiveSignInMethods] = useState([]);

  const fetchSignInMethods = async () => {
    try {
      loadingSetAction(true);

      const data = await firebase.auth.fetchSignInMethodsForEmail(
        authUser.email,
      );

      setAuthUserHasPassword(data.filter(
        provider => provider === 'password',
      ).length > 0);

      setActiveSignInMethods(data);
      loadingSetAction(false);
    } catch (error) {
      alertSetAction({
        message: error.message,
        type: 'danger',
      });

      loadingSetAction(false);
    }
  };

  useEffect(() => {
    fetchSignInMethods();
  }, []);

  return (
    <StyledGrid>
      <Sidebar content={sidebarContent} />

      <Box fullWidth margin="0">
        <Switch>
          <Route exact path={ROUTES.ACCOUNT_BASE}>
            <HelmetTitle title={{ id: 'pages.account.general.title' }} />

            <h1>
              <FormattedMessage id="pages.account.general.h1" />
            </h1>
          </Route>

          <Route
            path={ROUTES.ACCOUNT_CHANGE_PASSWORD}
            render={() => (
              <ChangePasswordSubpage
                alertSetAction={alertSetAction}
                authUserHasPassword={authUserHasPassword}
                authUser={authUser}
                fetchSignInMethodsHandler={fetchSignInMethods}
                firebase={firebase}
                isLoading={isLoading}
              />
            )}
          />

          <Route
            path={ROUTES.ACCOUNT_LOGIN_MANAGEMENT}
            render={() => (
              <LoginManagementSubpage
                activeSignInMethods={activeSignInMethods}
                alertSetAction={alertSetAction}
                authUser={authUser}
                fetchSignInMethodsHandler={fetchSignInMethods}
                firebase={firebase}
                isLoading={isLoading}
                loadingSetAction={loadingSetAction}
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
  authUser: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  isLoading: PropTypes.bool,
  loadingSetAction: PropTypes.func.isRequired,
};

AccountPage.defaultProps = {
  isLoading: false,
};

const mapStateToProps = state => ({
  authUser: state.session.authUser,
  isLoading: state.isLoading,
});

const mapDispatchToProps = {
  alertSetAction: alertSet,
  loadingSetAction: loadingSet,
};

const condition = authUser => !!authUser;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthorization(condition),
  withFirebase,
)(AccountPage);
