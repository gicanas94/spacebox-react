import * as Yup from 'yup';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import { alertSet } from '../../Redux/actions';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Hr from '../../components/Hr';
import { setCookie, getCookie } from '../../utils';
import { withFirebase } from '../../Firebase';

const PasswordChangeFormSchema = Yup.object().shape({
  password: Yup.string().required('This field is required!'),
  passwordOne: Yup.string()
    .required('This field is required!')
    .min(6, 'The minimum of characters for this field is 6'),
  passwordTwo: Yup.string()
    .required('This field is required!')
    .oneOf([Yup.ref('passwordOne'), null], 'Passwords must match'),
});

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPasswordAttemps: 0,
      reachedMaxCurrentPasswordAttemps: getCookie(
        'reachedMaxCurrentPasswordAttemps',
        false,
      ),
    };
  }

  handleSubmit = (values, actions) => {
    const { alertSetAction, authUser, firebase } = this.props;
    const { password, passwordOne } = values;

    alertSetAction(null);
    actions.setSubmitting(true);

    firebase.doSignInWithEmailAndPassword(authUser.email, password)
      .then(() => {
        firebase.doPasswordUpdate(passwordOne)
          .then(() => {
            alertSetAction({
              text: 'Your password was successfully updated.',
              type: 'success',
            });
          })
          .catch((error) => {
            alertSetAction({
              text: error.message,
              type: 'danger',
            });

            actions.setSubmitting(false);
          });
      })
      .catch(() => {
        actions.setStatus({
          currentPasswordIsWrong: 'Your current password is wrong',
        });

        this.setState(
          prevState => ({
            currentPasswordAttemps: prevState.currentPasswordAttemps + 1,
          }),
          () => {
            const { currentPasswordAttemps } = this.state;

            if (currentPasswordAttemps === 3) {
              this.handleReachedMaxCurrentPasswordAttemps(
                actions,
                alertSetAction,
              );
            }
          },
        );

        actions.setSubmitting(false);
      });
  };

  handleReachedMaxCurrentPasswordAttemps(actions, alertSetAction) {
    setCookie(
      'reachedMaxCurrentPasswordAttemps',
      '',
      new Date(new Date().getTime() + 30 * 60 * 1000).toGMTString(),
    );

    this.setState({ reachedMaxCurrentPasswordAttemps: true });

    alertSetAction({
      text: `You reached the limit of attempts to enter your current password,
        please try again later.`,
      type: 'danger',
    });

    actions.resetForm();
  }

  render() {
    const { reachedMaxCurrentPasswordAttemps } = this.state;

    return (
      <Formik
        initialValues={{
          password: '',
          passwordOne: '',
          passwordTwo: '',
        }}
        onSubmit={this.handleSubmit}
        validationSchema={PasswordChangeFormSchema}
        render={({
          errors,
          handleBlur,
          handleChange,
          isSubmitting,
          setStatus,
          status,
          touched,
          values,
        }) => (
          <Form>
            <Input
              autoFocus
              disabled={isSubmitting || reachedMaxCurrentPasswordAttemps}
              error={
                (errors.password && touched.password && errors.password)
                || (status && status.currentPasswordIsWrong)
                || (status && status.reachedMaxCurrentPasswordAttemps)
              }
              label="Current password"
              name="password"
              onBlur={handleBlur}
              onChange={(e) => {
                if (status) setStatus(false);
                handleChange(e);
              }}
              rounded
              success={!errors.password && touched.password && !status}
              type="password"
              value={status ? '' : values.password}
            />

            <Hr margin="25px 0" />

            <Input
              disabled={isSubmitting || reachedMaxCurrentPasswordAttemps}
              error={
                errors.passwordOne
                && touched.passwordOne
                && errors.passwordOne
              }
              label="New password"
              margin="0 0 25px 0"
              name="passwordOne"
              onBlur={handleBlur}
              onChange={handleChange}
              rounded
              success={!errors.passwordOne && touched.passwordOne}
              type="password"
              value={values.passwordOne}
            />

            <Input
              disabled={isSubmitting || reachedMaxCurrentPasswordAttemps}
              error={
                errors.passwordTwo
                && touched.passwordTwo
                && errors.passwordTwo
              }
              label="Confirm your new password"
              margin="0 0 25px 0"
              name="passwordTwo"
              onBlur={handleBlur}
              onChange={handleChange}
              rounded
              success={!errors.passwordTwo && touched.passwordTwo}
              type="password"
              value={values.passwordTwo}
            />

            <StyledButtonWrapper>
              <Button
                disabled={isSubmitting || reachedMaxCurrentPasswordAttemps}
                fullWidth
                rounded
                styleType="filled"
                type="submit"
              >
                {'Update'}
              </Button>
            </StyledButtonWrapper>
          </Form>
        )}
      />
    );
  }
}

PasswordChangeForm.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.objectOf(PropTypes.any).isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = { alertSetAction: alertSet };

const mapStateToProps = state => ({ authUser: state.session.authUser });

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase,
)(PasswordChangeForm);
