import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import { alertSet } from '../../Redux/actions';
import Box from '../../components/Box';
import HelmetTitle from '../../components/HelmetTitle';
import { ROUTES } from '../../constants';
import SignInForm from '../../forms/SignIn';
import SignInSocialMediaForm from '../../forms/SignInSocialMedia';
import { withFirebase } from '../../Firebase';

const SignInPage = ({
  alertSetAction,
  authUser,
  firebase,
  history,
}) => (
  authUser
    ? <Redirect to={ROUTES.HOME} />
    : (
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
    )
);

SignInPage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

SignInPage.defaultProps = {
  authUser: null,
};

const mapStateToProps = state => ({ authUser: state.session.authUser });

const mapDispatchToProps = { alertSetAction: alertSet };

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase,
  withRouter,
)(SignInPage);
