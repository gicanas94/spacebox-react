import _ from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import { alertSet } from '../../Redux/actions';
import { ERRORS, ROUTES } from '../../constants';
import SignInWithButton from '../../components/SignInWithButton';
import { withFirebase } from '../../Firebase';

class SignInSocialMedia extends Component {
  handleSignInWithClick = (doSignInWith) => {
    const { alertSetAction, firebase, history } = this.props;

    alertSetAction(null);

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

  render() {
    const { firebase } = this.props;

    return (
      <Fragment>
        <SignInWithButton
          account="Google"
          fullWidth
          margin="0 0 10px 0"
          onClick={() => this.handleSignInWithClick(
            firebase.doSignInWithGoogle,
          )}
          rounded
          type="button"
        />

        <SignInWithButton
          account="Facebook"
          fullWidth
          margin="0 0 10px 0"
          onClick={() => this.handleSignInWithClick(
            firebase.doSignInWithFacebook,
          )}
          rounded
          type="button"
        />

        <SignInWithButton
          account="Twitter"
          fullWidth
          onClick={() => this.handleSignInWithClick(
            firebase.doSignInWithTwitter,
          )}
          rounded
          type="button"
        />
      </Fragment>
    );
  }
}

SignInSocialMedia.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = { alertSetAction: alertSet };

export default compose(
  connect(null, mapDispatchToProps),
  withFirebase,
  withRouter,
)(SignInSocialMedia);
