import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { alertSet } from '../../Redux/actions';
import Box from '../../components/Box';
import HelmetTitle from '../../components/HelmetTitle';
import SignInForm from '../../forms/SignIn';
import SignInSocialMediaForm from '../../forms/SignInSocialMedia';
import { withFirebase } from '../../Firebase';

const SignInPage = ({ alertSetAction, firebase }) => (
  <Box size="small">
    <HelmetTitle title={{ id: 'pages.signIn.title' }} />
    <SignInForm alertSetAction={alertSetAction} firebase={firebase} />
    <SignInSocialMediaForm alertSetAction={alertSetAction} firebase={firebase} />
  </Box>
);

SignInPage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = { alertSetAction: alertSet };

export default compose(
  connect(null, mapDispatchToProps),
  withFirebase,
)(SignInPage);
