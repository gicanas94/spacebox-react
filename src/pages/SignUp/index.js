import { FormattedMessage } from 'react-intl';
import React from 'react';

import Box from '../../components/Box';
import HelmetTitle from '../../components/HelmetTitle';
import SignUpForm from '../../forms/SignUp';

const SignUpPage = () => (
  <Box size="medium">
    <HelmetTitle title={{ id: 'pages.signUp.title' }} />

    <h1>
      <FormattedMessage id="pages.signUp.h1" />
    </h1>

    <SignUpForm />
  </Box>
);

export default SignUpPage;
