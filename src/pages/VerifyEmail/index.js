import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { alertSet } from '../../Redux/actions';
import Box from '../../components/Box';
import Button from '../../components/Button';
import { font } from '../../styles';
import { ROUTES } from '../../constants';
import { withFirebase } from '../../Firebase';

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledEmail = styled.span`
  font-weight: ${font.weight.bold};
`;

class VerifyEmailPage extends Component {
  constructor(props) {
    super(props);

    this.state = { emailSent: null };
  }

  handleClick = () => {
    const { alertSetAction, firebase } = this.props;

    alertSetAction(null);

    firebase
      .doSendEmailVerification()
      .then(() => {
        alertSetAction({
          text: `We sent you an e-mail so you can verify your account. We
            hope everything goes well!`,
          type: 'success',
        });

        this.setState({ emailSent: true });
      })
      .catch(error => (
        alertSetAction({
          text: error.message,
          type: 'danger',
        })
      ));
  }

  render() {
    const { authUser } = this.props;
    const { emailSent } = this.state;

    return (
      !authUser
      || (authUser && authUser.emailVerified)
        ? <Redirect to={ROUTES.HOME} />
        : (
          <Box size="small">
            <Helmet>
              <title>Verify e-mail - Spacebox</title>
            </Helmet>

            <h2>Verify your e-mail</h2>
            <p>
              {`Please verify the e-mail of your account in
              order to access this page.`}
            </p>
            <p>
              {`Once you press the button below you will receive an e-mail
              in `}

              <StyledEmail>{authUser.email}</StyledEmail>
            </p>

            <StyledButtonWrapper>
              <Button disabled={emailSent} onClick={this.handleClick} rounded>
                {'Send'}
              </Button>
            </StyledButtonWrapper>
          </Box>
        )
    );
  }
}

VerifyEmailPage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.objectOf(PropTypes.any),
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
