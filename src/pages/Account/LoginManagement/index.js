import { FacebookSquare } from 'styled-icons/boxicons-logos/FacebookSquare';
import { FormattedMessage } from 'react-intl';
import { Google } from 'styled-icons/boxicons-logos/Google';
import { LockAlt } from 'styled-icons/boxicons-regular/LockAlt';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Twitter } from 'styled-icons/boxicons-logos/Twitter';

import { device } from '../../../styles';
import Hr from '../../../components/Hr';
import PasswordLoginToggle from './PasswordLoginToggle';
import SocialLoginToggle from './SocialLoginToggle';

const StyledSocialOption = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;

  button {
    margin-top: 15px;
    width: 145px;
  }

  .firstMediaQueryHr {
    margin: 25px 0;
    width: 145px;
  }

  .secondMediaQueryHr {
    display: none;
  }

  .passwordLinkFormSubmitButton {
    margin-top: 25px;
    width: 100%;
  }

  @media ${device.mobileL} {
    flex-direction: row;
    margin-bottom: 25px;

    &:last-of-type {
      margin-bottom: 0;
    }

    button {
      margin-top: 0;
    }

    .firstMediaQueryHr {
      display: none;
    }

    .secondMediaQueryHr {
      display: block;
      flex-grow: 1;
      margin: 0 25px;
      width: auto;
    }
  }
`;

const StyledIconAndNameWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 130px;

  svg {
    height: 30px;
    margin-right: 8px
    width: 30px;
  }

  @media ${device.mobileL} {
    justify-content: flex-start;
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

const LoginManagementSubpage = ({
  activeSignInMethods,
  alertSetAction,
  authUser,
  firebase,
  getSignInMethodsHandler,
  isLoading,
  isLoadingSetAction,
}) => {
  const signInMethods = [
    {
      id: 'password',
      displayName: 'pages.account.loginManagement.signInMethods.password',
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

  const handleSocialLoginLink = (provider) => {
    (async () => {
      try {
        alertSetAction();

        const providerToLink = signInMethods.filter(eachProvider => (
          eachProvider.provider === provider
        ));

        await firebase.doLinkWithPopup(provider);
        isLoadingSetAction(true);
        await getSignInMethodsHandler();

        alertSetAction({
          message: {
            id: 'pages.account.loginManagement.successLinkAlertMessage',
            values: { provider: providerToLink[0].id },
          },
          type: 'success',
        });
      } catch (error) {
        alertSetAction({
          message: error.message,
          type: 'danger',
        });
      } finally {
        isLoadingSetAction(false);
      }
    })();
  };

  const handleUnlink = (providerId) => {
    (async () => {
      try {
        alertSetAction();
        isLoadingSetAction(true);

        await firebase.doUnlink(providerId);
        await getSignInMethodsHandler();

        alertSetAction({
          message: {
            id: providerId === 'password'
              ? 'pages.account.loginManagement.successPasswordUnlinkAlertMessage'
              : 'pages.account.loginManagement.successUnlinkAlertMessage',
            values: { provider: providerId },
          },
          type: 'success',
        });
      } catch (error) {
        alertSetAction({
          message: error.message,
          type: 'danger',
        });
      } finally {
        isLoadingSetAction(false);
      }
    })();
  };

  return (
    <Fragment>
      <h2>
        <FormattedMessage id="pages.account.loginManagement.h2" />
      </h2>

      <p>
        <FormattedMessage id="pages.account.loginManagement.subtitle" />
      </p>

      {activeSignInMethods && signInMethods.map((signInMethod, index) => {
        const onlyOneLeft = activeSignInMethods.length === 1;
        const isEnabled = activeSignInMethods.includes(
          signInMethod.id,
        );

        return (
          <StyledSocialOption key={signInMethod.id}>
            <StyledIconAndNameWrapper>
              {signInMethod.icon()}

              <span>
                {signInMethod.id === 'password'
                  ? <FormattedMessage id={signInMethod.displayName} />
                  : signInMethod.displayName
                }
              </span>
            </StyledIconAndNameWrapper>

            <Hr className="secondMediaQueryHr" />

            {signInMethod.id === 'password'
              ? (
                <PasswordLoginToggle
                  alertSetAction={alertSetAction}
                  authUserEmail={authUser.email}
                  firebase={firebase}
                  getSignInMethodsHandler={getSignInMethodsHandler}
                  isEnabled={isEnabled}
                  isLoading={isLoading}
                  isLoadingSetAction={isLoadingSetAction}
                  onlyOneLeft={onlyOneLeft}
                  signInMethod={signInMethod}
                  unlinkHandler={handleUnlink}
                />
              ) : (
                <SocialLoginToggle
                  isEnabled={isEnabled}
                  isLoading={isLoading}
                  linkHandler={handleSocialLoginLink}
                  onlyOneLeft={onlyOneLeft}
                  signInMethod={signInMethod}
                  unlinkHandler={handleUnlink}
                />
              )
            }

            {signInMethods.length > index + 1 && (
              <Hr className="firstMediaQueryHr" />
            )}
          </StyledSocialOption>
        );
      })}
    </Fragment>
  );
};

LoginManagementSubpage.propTypes = {
  activeSignInMethods: PropTypes.arrayOf(PropTypes.string).isRequired,
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  getSignInMethodsHandler: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoadingSetAction: PropTypes.func.isRequired,
};

export default LoginManagementSubpage;
