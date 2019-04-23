import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Box from '../../../components/Box';
import PasswordLoginToggle from './PasswordLoginToggle';
import SocialLoginToggle from './SocialLoginToggle';
import { withFirebase } from '../../../Firebase';

const SIGN_IN_METHODS = [
  {
    id: 'password',
    displayName: 'Password',
    provider: null,
  },
  {
    id: 'google.com',
    displayName: 'Google',
    provider: 'googleProvider',
  },
  {
    id: 'facebook.com',
    displayName: 'Facebook',
    provider: 'facebookProvider',
  },
  {
    id: 'twitter.com',
    displayName: 'Twitter',
    provider: 'twitterProvider',
  },
];

class LoginManagement extends Component {
  constructor(props) {
    super(props);

    this.state = { activeSignInMethods: [] };
  }

  componentDidMount() {
    this.fetchSignInMethods();
  }

  fetchSignInMethods = () => {
    const { alertSetAction, authUser, firebase } = this.props;

    alertSetAction(null);

    firebase.auth
      .fetchSignInMethodsForEmail(authUser.email)
      .then(activeSignInMethods => this.setState({ activeSignInMethods }))
      .catch(error => (
        alertSetAction({
          text: error.message,
          type: 'danger',
        })
      ));
  };

  handlePasswordLoginLink = (password) => {
    const { alertSetAction, authUser, firebase } = this.props;

    alertSetAction(null);

    const credential = firebase.emailAuthProvider.credential(
      authUser.email,
      password,
    );

    firebase.auth.currentUser
      .linkAndRetrieveDataWithCredential(credential)
      .then(this.fetchSignInMethods)
      .catch(error => (
        alertSetAction({
          text: error.message,
          type: 'danger',
        })
      ));
  };

  handleSocialLoginLink = (provider) => {
    const { alertSetAction, firebase } = this.props;

    alertSetAction(null);

    firebase.auth.currentUser
      .linkWithPopup(firebase[provider])
      .then(this.fetchSignInMethods)
      .catch(error => (
        alertSetAction({
          text: error.message,
          type: 'danger',
        })
      ));
  };

  handleUnlink = (providerId) => {
    const { alertSetAction, firebase } = this.props;

    alertSetAction(null);

    firebase.auth.currentUser
      .unlink(providerId)
      .then(this.fetchSignInMethods)
      .catch(error => (
        alertSetAction({
          text: error.message,
          type: 'danger',
        })
      ));
  };

  render() {
    const { activeSignInMethods } = this.state;

    return (
      <Box size="small">
        {SIGN_IN_METHODS.map((signInMethod) => {
          const onlyOneLeft = activeSignInMethods.length === 1;
          const isEnabled = activeSignInMethods.includes(
            signInMethod.id,
          );

          return (
            signInMethod.id === 'password' ? (
              <PasswordLoginToggle
                isEnabled={isEnabled}
                key={signInMethod.id}
                onLinkHandler={this.handlePasswordLoginLink}
                onlyOneLeft={onlyOneLeft}
                onUnlinkHandler={this.handleUnlink}
                signInMethod={signInMethod}
              />
            ) : (
              <SocialLoginToggle
                isEnabled={isEnabled}
                key={signInMethod.id}
                onLinkHandler={this.handleSocialLoginLink}
                onlyOneLeft={onlyOneLeft}
                onUnlinkHandler={this.handleUnlink}
                signInMethod={signInMethod}
              />
            )
          );
        })}
      </Box>
    );
  }
}

LoginManagement.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.objectOf(PropTypes.any).isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withFirebase(LoginManagement);
