import { FormattedMessage } from 'react-intl';
import React from 'react';

import Box from '../../components/Box';
import HelmetTitle from '../../components/HelmetTitle';
import PasswordForgetForm from '../../forms/PasswordForget';

const PasswordForgetPage = () => (
  <Box size="small">
    <HelmetTitle title={{ id: 'pages.passwordForget.title' }} />

    <p>
      <FormattedMessage id="pages.passwordForget.p" />
    </p>

    <PasswordForgetForm />
  </Box>
);

export default PasswordForgetPage;
