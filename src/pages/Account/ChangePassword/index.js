import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import { getCookie } from '../../../utils';
import PasswordChangeForm from '../../../forms/PasswordChange';

const ChangePasswordSubpage = ({ alertSetAction, authUser, firebase }) => (
  <>
    <h3>
      <FormattedMessage id="pages.account.changePassword.h3" />
    </h3>

    {getCookie('reachedMaxCurrentPasswordAttemps', false) ? (
      <p>
        <FormattedMessage id="pages.account.changePassword.reachedMaxCurrentPasswordAttempsSubtitle" />
      </p>
    ) : (
      <p>
        <FormattedMessage id="pages.account.changePassword.subtitle" />
      </p>
    )}

    <PasswordChangeForm
      alertSetAction={alertSetAction}
      authUser={authUser}
      firebase={firebase}
    />
  </>
);

ChangePasswordSubpage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ChangePasswordSubpage;
