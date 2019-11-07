import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Emoji from '../../../components/Emoji';
import HelmetTitle from '../../../components/HelmetTitle';
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
    <HelmetTitle title={{ id: 'pages.account.changePassword.title' }} />

    <h1>
      <FormattedMessage id="pages.account.changePassword.h1" />
    </h1>

    {isLoading && <LoadingSpinner />}

    {!isLoading && (
      authUserHasPassword ? (
        <Fragment>
          <p>
            <FormattedMessage
              id="pages.account.changePassword.changePasswordSubtitle"
            />

            <Emoji
              label="pages.account.changePassword.changePasswordSubtitleEmojiLabel"
              symbol="🙂"
            />
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
            <FormattedMessage
              id="pages.account.changePassword.linkPasswordSubtitle"
            />
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
