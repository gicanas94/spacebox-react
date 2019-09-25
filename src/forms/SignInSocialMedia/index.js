import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { ERRORS, ROUTES } from '../../constants';
import SignInWithButton from '../../components/SignInWithButton';

const SignInSocialMedia = ({ alertSetAction, firebase, history }) => {
  const handleSignInWithClick = (doSignInWith) => {
    alertSetAction();

    doSignInWith()
      .then((socialAuthUser) => {
        const user = firebase.getUser(socialAuthUser.user.uid);

        user.get()
          .then((document) => {
            if (socialAuthUser.additionalUserInfo.isNewUser) {
              user.set({
                createdAt: moment().valueOf(),
                email: socialAuthUser.additionalUserInfo.profile.email,
                isAdmin: false,
                slug: `${_.kebabCase(
                  socialAuthUser.additionalUserInfo.profile.name,
                )}-${Math.floor(Math.random() * 10000)}`,
                username: socialAuthUser.additionalUserInfo.profile.name,
              });
            } else {
              user.set({
                createdAt: document.data().createdAt,
                email: socialAuthUser.additionalUserInfo.profile.email,
                isAdmin: document.data().isAdmin,
                slug: document.data().slug,
                username: document.data().username,
              });
            }
          });
      })
      .then(() => history.push(ROUTES.HOME))
      .catch(error => (
        alertSetAction({
          text: error.code === ERRORS.FIREBASE.ACCOUNT_EXISTS.CODE
            ? ERRORS.FIREBASE.ACCOUNT_EXISTS.MESSAGE
            : error.message,
          type: 'danger',
        })
      ));
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
