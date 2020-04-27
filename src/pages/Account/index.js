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

const AccountPage = ({
  alertSetAction,
  authUser,
  firebase,
  isLoading,
  isLoadingSetAction,
}) => {
  const [authUserHasPassword, setAuthUserHasPassword] = useState(false);
  const [activeSignInMethods, setActiveSignInMethods] = useState([]);

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

  const getSignInMethods = () => (
    new Promise((resolve, reject) => {
      firebase.doFetchSignInMethodsForEmail(authUser.email)
        .then((signInMethods) => {
          setAuthUserHasPassword(signInMethods.filter(
            (provider) => provider === 'password',
          ).length > 0);

          setActiveSignInMethods(signInMethods);
          resolve();
        })
        .catch((error) => reject(error));
    })
  );

  useEffect(() => {
    (async () => {
      try {
        isLoadingSetAction(true);
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
    <StyledMainGrid>
      <HelmetTitle title={{ id: 'pages.account.title' }} />

      <StyledSidebarWrapper>
        <Sidebar content={sidebarContent} />
      </StyledSidebarWrapper>

      <StyledContentGrid>
        <Box fullWidth>
          <h2>
            <FormattedMessage id="pages.account.h2" />
          </h2>

          <Box fullWidth id="general-settings" noBorder padding="0">
            <GeneralSettingsSubpage
              alertSetAction={alertSetAction}
              authUser={authUser}
              firebase={firebase}
              isLoadingSetAction={isLoadingSetAction}
            />
          </Box>
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
      </StyledContentGrid>
    </StyledMainGrid>
  );
};

AccountPage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoadingSetAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
});

const mapDispatchToProps = {
  alertSetAction: alertSet,
  isLoadingSetAction: isLoadingSet,
};

const condition = (authUser) => !!authUser;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthorization(condition),
  withFirebase,
)(AccountPage);
