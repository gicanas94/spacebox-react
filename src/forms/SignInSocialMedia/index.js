import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { defineAppLocale } from '../../utils';
import { ERRORS, ROUTES } from '../../constants';
import SignInWithButton from '../../components/SignInWithButton';

const SignInSocialMedia = ({ alertSetAction, firebase, history }) => {
  const handleSignInWithClick = (doSignInWith) => {
    (async () => {
      try {
        alertSetAction();

        const socialAuthUser = await doSignInWith();

        if (socialAuthUser.additionalUserInfo.isNewUser) {
          await firebase.user(socialAuthUser.user.uid).set({
            createdAt: new Date().toISOString(),
            language: defineAppLocale(),
            profileImageUrl: socialAuthUser.user.photoURL,
            slug: `${_.kebabCase(
              socialAuthUser.additionalUserInfo.profile.name,
            )}-${Math.floor(Math.random() * 10000)}`,
            username: socialAuthUser.additionalUserInfo.profile.name,
          });

          await firebase.userRestrictedData(socialAuthUser.user.uid).set({
            isAdmin: false,
          });
        }

        history.push(ROUTES.HOME);
      } catch (error) {
        alertSetAction({
          message: error.code === ERRORS.FIREBASE.ACCOUNT_EXISTS.CODE
            ? { id: ERRORS.FIREBASE.ACCOUNT_EXISTS.MESSAGE }
            : error.message,
          type: 'danger',
        });
      }
    })();
  };

  return (
    <Fragment>
      <SignInWithButton
        account="Google"
        fullWidth
        margin="0 0 10px 0"
        onClick={() => handleSignInWithClick(
          firebase.doSignInWithGoogle,
        )}
        rounded
        type="button"
      />

      <SignInWithButton
        account="Facebook"
        fullWidth
        margin="0 0 10px 0"
        onClick={() => handleSignInWithClick(
          firebase.doSignInWithFacebook,
        )}
        rounded
        type="button"
      />

      <SignInWithButton
        account="Twitter"
        fullWidth
        onClick={() => handleSignInWithClick(
          firebase.doSignInWithTwitter,
        )}
        rounded
        type="button"
      />
    </Fragment>
  );
};

SignInSocialMedia.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SignInSocialMedia;
