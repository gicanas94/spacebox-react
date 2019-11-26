import { compose } from 'recompose';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
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
  loadingSetAction,
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

  const fetchSignInMethods = async () => {
    try {
      loadingSetAction(true);

      const signInMethods = await firebase.doFetchSignInMethodsForEmail(
        authUser.email,
      );

      setAuthUserHasPassword(signInMethods.filter(
        provider => provider === 'password',
      ).length > 0);

      setActiveSignInMethods(signInMethods);
    } catch (error) {
      alertSetAction({
        message: error.message,
        type: 'danger',
      });
    } finally {
      loadingSetAction(false);
    }
  };

  useEffect(() => { fetchSignInMethods(); }, []);

  return (
    <StyledGrid>
      <HelmetTitle title={{ id: 'pages.account.title' }} />
      <Sidebar content={sidebarContent} />

      <div className="content">
        <Box fullWidth id="general-settings">
          <h1>
            <FormattedMessage id="pages.account.h1" />
          </h1>

          <h2>
            <FormattedMessage id="pages.account.generalSettings.h2" />
          </h2>
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
            fetchSignInMethodsHandler={fetchSignInMethods}
            firebase={firebase}
            isLoading={isLoading}
            loadingSetAction={loadingSetAction}
          />
        </Box>
      </div>
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
