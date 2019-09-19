import { Helmet } from 'react-helmet';
import React from 'react';

import Box from '../../components/Box';
import PasswordForgetForm from '../../forms/PasswordForget';

const PasswordForgetPage = () => (
  <Box size="small">
    <Helmet title="Forgot password - Spacebox" />
    <p>Please enter the e-mail address of your account.</p>
    <PasswordForgetForm />
  </Box>
);

export default PasswordForgetPage;
