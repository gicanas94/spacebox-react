import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import GeneralSettingsForm from '../../../forms/GeneralSettings';

const GeneralSettingsSubpage = ({ alertSetAction, authUser, firebase }) => (
  <Fragment>
    <h2>
      <FormattedMessage id="pages.account.generalSettings.h2" />
    </h2>

    <GeneralSettingsForm
      alertSetAction={alertSetAction}
      authUser={authUser}
      firebase={firebase}
    />
  </Fragment>
);

GeneralSettingsSubpage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default GeneralSettingsSubpage;
