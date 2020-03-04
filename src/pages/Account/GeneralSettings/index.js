import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import GeneralSettingsForm from '../../../forms/GeneralSettings';

const GeneralSettingsSubpage = ({ ...props }) => (
  <Fragment>
    <h2>
      <FormattedMessage id="pages.account.generalSettings.h2" />
    </h2>

    <p>
      <FormattedMessage id="pages.account.generalSettings.subtitle" />
    </p>

    <GeneralSettingsForm {...props} />
  </Fragment>
);

GeneralSettingsSubpage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  isLoadingSetAction: PropTypes.func.isRequired,
};

export default GeneralSettingsSubpage;
