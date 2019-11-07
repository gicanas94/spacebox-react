import { compose } from 'recompose';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { alertSet } from '../../Redux/actions';
import Box from '../../components/Box';
import Button from '../../components/Button';
import HelmetTitle from '../../components/HelmetTitle';
import { ROUTES } from '../../constants';
import { setCookie, getCookie } from '../../utils';
import { withFirebase } from '../../Firebase';

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledEmail = styled.span`
  font-weight: ${({ theme }) => theme.pages.VerifyEmail.email.fontWeight};
`;

const VerifyEmailPage = ({ alertSetAction, authUser, firebase }) => {
  const [emailSent, setEmailSent] = useState(false);

  const handleClick = () => {
    alertSetAction();

    firebase
      .doSendEmailVerification()
      .then(() => {
        alertSetAction({
          message: { id: 'pages.verifyEmail.successAlertMessage' },
          type: 'success',
        });

        setEmailSent(true);

        setCookie(
          'verificationEmailSentRecently',
          '',
          new Date(new Date().getTime() + 5 * 60 * 1000).toGMTString(),
        );
      })
      .catch(error => (
        alertSetAction({
          message: error.message,
          type: 'danger',
        })
      ));
  };

  return (
    authUser
    || (authUser && authUser.emailVerified)
      ? <Redirect to={ROUTES.HOME} />
      : (
        <Box size="small">
          <HelmetTitle title={{ id: 'pages.verifyEmail.title' }} />

          <h1>
            <FormattedMessage id="pages.verifyEmail.h1" />
          </h1>

          <p>
            <FormattedMessage id="pages.verifyEmail.p1" />
          </p>

          <p>
            <FormattedMessage id="pages.verifyEmail.p2" />
            <StyledEmail>{authUser.email}</StyledEmail>
          </p>

          <StyledButtonWrapper>
            <Button
              disabled={
                (
                  emailSent
                  || getCookie('verificationEmailSentRecently', false)
                )
              }
              fullWidth
              onClick={handleClick}
              rounded
              styleType="filled"
              type="submit"
            >
              {'pages.verifyEmail.submitButton'}
            </Button>
          </StyledButtonWrapper>
        </Box>
      )
  );
};

VerifyEmailPage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
};

VerifyEmailPage.defaultProps = {
  authUser: null,
};

const mapStateToProps = state => ({ authUser: state.session.authUser });

const mapDispatchToProps = { alertSetAction: alertSet };

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase,
)(VerifyEmailPage);
