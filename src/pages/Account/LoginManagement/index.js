import { FacebookSquare } from 'styled-icons/boxicons-logos/FacebookSquare';
import { Google } from 'styled-icons/boxicons-logos/Google';
import { Helmet } from 'react-helmet';
import { LockAlt } from 'styled-icons/boxicons-regular/LockAlt';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Twitter } from 'styled-icons/boxicons-logos/Twitter';

import Hr from '../../../components/Hr';
import PasswordLoginToggle from './PasswordLoginToggle';
import SocialLoginToggle from './SocialLoginToggle';

const StyledSocialOption = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 25px;

  &:first-of-type {
    margin-top: 0;
  }

  hr {
    flex-grow: 1;
  }
`;

const StyledIconAndNameWrapper = styled.div`
  align-items: center;
  display: flex;
  width: 130px;

  svg {
    height: 30px;
    margin-right: 8px
    width: 30px;
  }
`;

const StyledPasswordIcon = styled(LockAlt)`
  color: #5e5e5e;
`;

const StyledFacebookIcon = styled(FacebookSquare)`
  color: #3b5998;
`;

const StyledGoogleIcon = styled(Google)`
  color: #db4437;
`;

const StyledTwitterIcon = styled(Twitter)`
  color: #00acee;
`;

const SIGN_IN_METHODS = [
  {
    id: 'password',
    displayName: 'Password',
    provider: null,
    icon: () => <StyledPasswordIcon />,
  },
  {
    id: 'google.com',
    displayName: 'Google',
    provider: 'googleProvider',
    icon: () => <StyledGoogleIcon />,
  },
  {
    id: 'facebook.com',
    displayName: 'Facebook',
    provider: 'facebookProvider',
    icon: () => <StyledFacebookIcon />,
  },
  {
    id: 'twitter.com',
    displayName: 'Twitter',
    provider: 'twitterProvider',
    icon: () => <StyledTwitterIcon />,
  },
];

const LoginManagementSubpage = ({
  activeSignInMethods,
  alertSetAction,
  authUser,
  fetchSignInMethodsHandler,
  firebase,
  isLoading,
  loadingSetAction,
}) => {
  const handleSocialLoginLink = (provider) => {
    alertSetAction();

    const providerToLink = SIGN_IN_METHODS.filter(eachProvider => (
      eachProvider.provider === provider
    ));

    firebase.auth.currentUser
      .linkWithPopup(firebase[provider])
      .then(() => {
        fetchSignInMethodsHandler();

        alertSetAction({
          text: `Congratulations! You just linked your ${providerToLink[0].id} account.`,
          type: 'success',
        });
      })
      .catch(error => (
        alertSetAction({
          text: error.message,
          type: 'danger',
        })
      ));
  };

  const handleUnlink = (providerId) => {
    alertSetAction();
    loadingSetAction(true);

    firebase.auth.currentUser
      .unlink(providerId)
      .then(() => {
        fetchSignInMethodsHandler();

        alertSetAction({
          text: `Your ${providerId} account has been unlinked.`,
          type: 'success',
        });
      })
      .catch((error) => {
        alertSetAction({
          text: error.message,
          type: 'danger',
        });

        loadingSetAction(false);
      });
  };

  return (
    <Fragment>
      <Helmet title="Change password - Spacebox" />
      <h1>Login management</h1>
      <p>Manage how you sign in and link your social media accounts.</p>

      {activeSignInMethods && SIGN_IN_METHODS.map((signInMethod) => {
        const onlyOneLeft = activeSignInMethods.length === 1;
        const isEnabled = activeSignInMethods.includes(
          signInMethod.id,
        );

        return (
          signInMethod.id === 'password' ? (
            <StyledSocialOption key={signInMethod.id}>
              <StyledIconAndNameWrapper>
                {signInMethod.icon()}
                {signInMethod.displayName}
              </StyledIconAndNameWrapper>

              <Hr borderWidth="0.5px" margin="0 15px" width="auto" />

              <PasswordLoginToggle
                alertSetAction={alertSetAction}
                authUserEmail={authUser.email}
                fetchSignInMethodsHandler={fetchSignInMethodsHandler}
                firebase={firebase}
                isEnabled={isEnabled}
                isLoading={isLoading}
                onlyOneLeft={onlyOneLeft}
                onUnlinkHandler={handleUnlink}
                signInMethod={signInMethod}
              />
            </StyledSocialOption>
          ) : (
            <StyledSocialOption key={signInMethod.id}>
              <StyledIconAndNameWrapper>
                {signInMethod.icon()}
                {signInMethod.displayName}
              </StyledIconAndNameWrapper>

              <Hr borderWidth="0.5px" margin="0 15px" width="auto" />

              <SocialLoginToggle
                isEnabled={isEnabled}
                isLoading={isLoading}
                onLinkHandler={handleSocialLoginLink}
                onlyOneLeft={onlyOneLeft}
                onUnlinkHandler={handleUnlink}
                signInMethod={signInMethod}
              />
            </StyledSocialOption>
          )
        );
      })}
    </Fragment>
  );
};

LoginManagementSubpage.propTypes = {
  activeSignInMethods: PropTypes.arrayOf(PropTypes.string).isRequired,
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchSignInMethodsHandler: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  isLoading: PropTypes.bool,
  loadingSetAction: PropTypes.func.isRequired,
};

LoginManagementSubpage.defaultProps = {
  isLoading: false,
};

export default LoginManagementSubpage;
