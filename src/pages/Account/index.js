import { compose } from 'recompose';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { alertSet, isLoadingSet } from '../../Redux/actions';
import Box from '../../components/Box';
import ChangePasswordSubpage from './ChangePassword';
import { device } from '../../styles';
import GeneralSettingsSubpage from './GeneralSettings';
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

  .content {
    & > div {
      margin-bottom: 10px;
    }

    & div:last-of-type {
      margin-bottom: 0;
    }
  }

  @media ${device.tablet} {
    grid-template-columns: auto 1fr;
  }

  @media ${device.laptop} {
    grid-gap: 20px;
    max-width: 910px;

    .content {
      & > div {
        margin-bottom: 20px;
      }

      & > div:last-of-type {
        margin-bottom: 0;
      }
    }
  }
`;

const AccountPage = ({
  alertSetAction,
  authUser,
  firebase,
  isLoading,
  isLoadingSetAction,
}) => {
  const [authUserHasPassword, setAuthUserHasPassword] = useState(false);
  const [activeSignInMethods, setActiveSignInMethods] = useState([]);
  const [databaseAuthUser, setDatabaseAuthUser] = useState({});

  const sidebarContent = [
    {
      heading: 'pages.account.sidebarContent.section1.heading',
      links: [
        {
          text: 'pages.account.sidebarContent.section1.links.generalSettings',
          to: ROUTES.ACCOUNT_GENERAL_SETTINGS,
          visible: true,
        },
        {
          text: 'pages.account.sidebarContent.section1.links.changePassword',
          to: ROUTES.ACCOUNT_CHANGE_PASSWORD,
          visible: authUserHasPassword,
        },
        {
          text: 'pages.account.sidebarContent.section1.links.loginManagement',
          to: ROUTES.ACCOUNT_LOGIN_MANAGEMENT,
          visible: true,
        },
      ],
    },
  ];

  const getDatabaseAuthUser = () => (
    new Promise((resolve, reject) => {
      firebase.user(authUser.uid).get()
        .then((document) => {
          setDatabaseAuthUser(document.data());
          resolve();
        })
        .catch(error => reject(error));
    })
  );

  const getSignInMethods = () => (
    new Promise((resolve, reject) => {
      firebase.doFetchSignInMethodsForEmail(authUser.email)
        .then((signInMethods) => {
          setAuthUserHasPassword(signInMethods.filter(
            provider => provider === 'password',
          ).length > 0);

          setActiveSignInMethods(signInMethods);
          resolve();
        })
        .catch(error => reject(error));
    })
  );

  useEffect(() => {
    (async () => {
      try {
        isLoadingSetAction(true);
        await getDatabaseAuthUser();
        await getSignInMethods();
      } catch (error) {
        alertSetAction({
          message: error.message,
          type: 'danger',
        });
      } finally {
        isLoadingSetAction(false);
      }
    })();
  }, []);

  return (
    <StyledGrid>
      <HelmetTitle title={{ id: 'pages.account.title' }} />
      <Sidebar content={sidebarContent} />

      <div className="content">
        <Box fullWidth id="general-settings">
          <h1>
            <FormattedMessage id="pages.account.h1" />
          </h1>

          <GeneralSettingsSubpage
            alertSetAction={alertSetAction}
            authUser={authUser}
            databaseAuthUser={databaseAuthUser}
            firebase={firebase}
            getDatabaseAuthUserHandler={getDatabaseAuthUser}
          />
        </Box>

        {authUserHasPassword && (
          <Box fullWidth id="change-password">
            <ChangePasswordSubpage
              alertSetAction={alertSetAction}
              authUser={authUser}
              firebase={firebase}
            />
          </Box>
        )}

        <Box fullWidth id="login-management">
          <LoginManagementSubpage
            activeSignInMethods={activeSignInMethods}
            alertSetAction={alertSetAction}
            authUser={authUser}
            firebase={firebase}
            getSignInMethodsHandler={getSignInMethods}
            isLoading={isLoading}
            isLoadingSetAction={isLoadingSetAction}
          />
        </Box>
      </div>
    </StyledGrid>
  );
};

AccountPage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoadingSetAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authUser: state.authUser,
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
)(AccountPage);
