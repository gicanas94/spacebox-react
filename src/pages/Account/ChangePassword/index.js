import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Emoji from '../../../components/Emoji';
import PasswordChangeForm from '../../../forms/PasswordChange';

const ChangePasswordSubpage = ({ alertSetAction, authUser, firebase }) => (
  <Fragment>
    <Helmet title="Change password - Spacebox" />
    <h1>Change password</h1>

    <p>
      Complete the following inputs to change your password. Dont forget your
      current one, just in case <Emoji label="Slightly Smiling Face" symbol="🙂" />
    </p>

    <PasswordChangeForm
      alertSetAction={alertSetAction}
      authUser={authUser}
      firebase={firebase}
    />
  </Fragment>
);

ChangePasswordSubpage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.objectOf(PropTypes.any).isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ChangePasswordSubpage;
