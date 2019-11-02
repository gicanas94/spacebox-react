import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Emoji from '../../../components/Emoji';
import LoadingSpinner from '../../../components/LoadingSpinner';
import PasswordChangeForm from '../../../forms/PasswordChange';
import PasswordLinkForm from '../../../forms/PasswordLink';

const ChangePasswordSubpage = ({
  alertSetAction,
  authUser,
  authUserHasPassword,
  fetchSignInMethodsHandler,
  firebase,
  isLoading,
}) => (
  <Fragment>
    <Helmet title="Change password - Spacebox" />
    <h1>Change password</h1>

    {isLoading && <LoadingSpinner />}

    {!isLoading && (
      authUserHasPassword ? (
        <Fragment>
          <p>
            Complete the following inputs to change your password. Don't forget your
            current one, just in case <Emoji label="Slightly Smiling Face" symbol="🙂" />
          </p>

          <PasswordChangeForm
            alertSetAction={alertSetAction}
            authUser={authUser}
            firebase={firebase}
          />
        </Fragment>
      ) : (
        <Fragment>
          <p>
            You don't have a password linked to your account, but let's do that
            right now.
          </p>

          <PasswordLinkForm
            alertSetAction={alertSetAction}
            authUserEmail={authUser.email}
            firebase={firebase}
            page="changePassword"
            fetchSignInMethodsHandler={fetchSignInMethodsHandler}
          />
        </Fragment>
      )
    )}
  </Fragment>
);

ChangePasswordSubpage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.objectOf(PropTypes.any).isRequired,
  authUserHasPassword: PropTypes.bool.isRequired,
  fetchSignInMethodsHandler: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  isLoading: PropTypes.bool,
};

ChangePasswordSubpage.defaultProps = {
  isLoading: false,
};

export default ChangePasswordSubpage;
