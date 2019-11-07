import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';

import { alertSet } from '../../Redux/actions';
import Box from '../../components/Box';
import HelmetTitle from '../../components/HelmetTitle';
import { ROUTES } from '../../constants';
import SignUpForm from '../../forms/SignUp';

const SignUpPage = ({ alertSetAction, authUser }) => (
  authUser
    ? <Redirect to={ROUTES.HOME} />
    : (
      <Box size="medium">
        <HelmetTitle title={{ id: 'pages.signUp.title' }} />

        <h1>
          <FormattedMessage id="pages.signUp.h1" />
        </h1>

        <SignUpForm alertSetAction={alertSetAction} />
      </Box>
    )
);

SignUpPage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

SignUpPage.defaultProps = {
  authUser: null,
};

const mapStateToProps = state => ({ authUser: state.session.authUser });

const mapDispatchToProps = { alertSetAction: alertSet };

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
