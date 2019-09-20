import { Helmet } from 'react-helmet';
import React, { Fragment } from 'react';

import Emoji from '../../../components/Emoji';
import PasswordChangeForm from '../../../forms/PasswordChange';

const ChangePasswordSubpage = () => (
  <Fragment>
    <Helmet title="Change password - Spacebox" />
    <h1>Change password</h1>

    <p>
      Complete the following inputs to change your password. Don't forget your
      current one, just in case <Emoji label="Slightly Smiling Face" symbol="🙂" />
    </p>

    <PasswordChangeForm />
  </Fragment>
);

export default ChangePasswordSubpage;
