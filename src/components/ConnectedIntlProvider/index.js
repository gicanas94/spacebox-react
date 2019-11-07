import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import messages from '../../i18n';

const ConnectedIntlProvider = ({ appLocale, children }) => (
  <IntlProvider
    locale={appLocale}
    messages={messages[appLocale]}
    timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}
  >
    {children}
  </IntlProvider>
);

ConnectedIntlProvider.propTypes = {
  appLocale: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const mapStateToProps = state => ({
  appLocale: state.appLocale,
});

export default connect(mapStateToProps)(ConnectedIntlProvider);
