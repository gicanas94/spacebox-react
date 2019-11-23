import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { alertSet } from '../../Redux/actions';
import Box from '../../components/Box';
import HelmetTitle from '../../components/HelmetTitle';
import SignInForm from '../../forms/SignIn';
import SignInSocialMediaForm from '../../forms/SignInSocialMedia';
import { withFirebase } from '../../Firebase';

const SignInPage = ({ alertSetAction, firebase, history }) => (
  <Box size="small">
    <HelmetTitle title={{ id: 'pages.signIn.title' }} />

    <SignInForm
      alertSetAction={alertSetAction}
      firebase={firebase}
      history={history}
    />

    <SignInSocialMediaForm
      alertSetAction={alertSetAction}
      firebase={firebase}
      history={history}
    />
  </Box>
);

SignInPage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = { alertSetAction: alertSet };

export default compose(
  connect(null, mapDispatchToProps),
  withFirebase,
  withRouter,
)(SignInPage);
