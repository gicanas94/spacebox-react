import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { alertSet } from '../../Redux/actions';
import { ERRORS, ROUTES } from '../../constants';
import SignInWithButton from '../../components/SignInWithButton';
import { withFirebase } from '../../Firebase';

class SignInTwitterForm extends Component {
  handleSubmit = (event) => {
    const { alertSetAction, firebase, history } = this.props;

    alertSetAction(null);

    firebase
      .doSignInWithTwitter()
      .then((socialAuthUser) => {
        const user = firebase.user(socialAuthUser.user.uid);

        user
          .once('value')
          .then((snapshot) => {
            if (socialAuthUser.additionalUserInfo.isNewUser) {
              user.set({
                createdAt: firebase.serverValue.TIMESTAMP,
                email: socialAuthUser.additionalUserInfo.profile.email,
                isAdmin: false,
                username: socialAuthUser.additionalUserInfo.profile.name,
              });
            } else {
              user.set({
                createdAt: snapshot.val().createdAt,
                email: socialAuthUser.additionalUserInfo.profile.email,
                isAdmin: snapshot.val().isAdmin,
                username: snapshot.val().username,
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

    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <SignInWithButton
          account="Twitter"
          fullWidth
          margin="10px 0 0 0"
          rounded
          type="submit"
        />
      </form>
    );
  }
}

SignInTwitterForm.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = { alertSetAction: alertSet };

export default compose(
  connect(null, mapDispatchToProps),
  withFirebase,
  withRouter,
)(SignInTwitterForm);
