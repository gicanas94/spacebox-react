import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Emoji from '../../../components/Emoji';
import { getCookie } from '../../../utils';
import PasswordChangeForm from '../../../forms/PasswordChange';

const ChangePasswordSubpage = ({ alertSetAction, authUser, firebase }) => (
  <Fragment>
    <h2>
      <FormattedMessage id="pages.account.changePassword.h2" />
    </h2>

    {getCookie('reachedMaxCurrentPasswordAttemps', false)
      ? (
        <p>
          <FormattedMessage
            id="pages.account.changePassword.reachedMaxCurrentPasswordAttempsSubtitle"
          />
        </p>
      ) : (
        <p>
          <FormattedMessage
            id="pages.account.changePassword.subtitle"
          />

          <Emoji
            label="pages.account.changePassword.subtitleEmojiLabel"
            symbol="🙂"
          />
        </p>
      )
    }

    <PasswordChangeForm
      alertSetAction={alertSetAction}
      authUser={authUser}
      firebase={firebase}
    />
  </Fragment>
);

ChangePasswordSubpage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ChangePasswordSubpage;
