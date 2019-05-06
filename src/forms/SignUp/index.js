import * as Yup from 'yup';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { alertSet } from '../../Redux/actions';
import Button from '../../components/Button';
import { device } from '../../styles';
import Input from '../../components/Input';
import { ROUTES } from '../../constants';
import { SignInLink } from '../../pages/SignUp';
import { withFirebase } from '../../Firebase';

const SignUpFormSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please check your e-mail')
    .required('This field is required!'),
  passwordOne: Yup.string()
    .required('This field is required!')
    .min(6, 'The minimum of characters for this field is 6'),
  passwordTwo: Yup.string()
    .required('This field is required!')
    .oneOf([Yup.ref('passwordOne'), null], 'Passwords must match'),
  username: Yup.string()
    .min(4, 'The minimum of characters for this field is 4')
    .max(25, 'The maximum of characters for this field is 25')
    .required('This field is required!'),
});

const StyledGrid = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: 1fr;
  width: inherit;

  @media ${device.mobileL} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StyledBottomWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
`;

class SignUpForm extends Component {
  handleSubmit = (values, actions) => {
    const { alertSetAction, firebase, history } = this.props;
    const { email, passwordOne, username } = values;

    alertSetAction(null);
    actions.setSubmitting(true);

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => (
        firebase
          .user(authUser.user.uid)
          .set({
            createdAt: firebase.serverValue.TIMESTAMP,
            email,
            isAdmin: false,
            isSpaceboxOwner: false,
            username,
          })
      ))
      .then(() => {
        firebase.doSendEmailVerification();
        history.push(ROUTES.HOME);

        alertSetAction({
          text: `Welcome to Spacebox! Please, follow the instructions that
            you received in your e-mail account in order to enjoy 100% of
            Spacebox.`,
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
  };

  render() {
    return (
      <Formik
        initialValues={{
          email: '',
          passwordOne: '',
          passwordTwo: '',
          username: '',
        }}
        onSubmit={this.handleSubmit}
        validationSchema={SignUpFormSchema}
        render={({
          errors,
          handleBlur,
          handleChange,
          isSubmitting,
          touched,
          values,
        }) => (
          <Form>
            <StyledGrid>
              <div>
                <Input
                  autoFocus
                  disabled={isSubmitting}
                  error={errors.username && touched.username && errors.username}
                  label="Name or Username"
                  margin="0 0 25px 0"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  rounded
                  success={!errors.username && touched.username}
                  type="text"
                  value={values.username}
                />

                <Input
                  disabled={isSubmitting}
                  error={errors.email && touched.email && errors.email}
                  label="E-mail"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  rounded
                  success={!errors.email && touched.email}
                  type="text"
                  value={values.email}
                />
              </div>

              <div>
                <Input
                  disabled={isSubmitting}
                  error={
                    errors.passwordOne
                    && touched.passwordOne
                    && errors.passwordOne
                  }
                  label="Password"
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
                  disabled={isSubmitting}
                  error={
                    errors.passwordTwo
                    && touched.passwordTwo
                    && errors.passwordTwo
                  }
                  label="Confirm your password"
                  margin="0 0 25px 0"
                  name="passwordTwo"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  rounded
                  success={!errors.passwordTwo && touched.passwordTwo}
                  type="password"
                  value={values.passwordTwo}
                />
              </div>
            </StyledGrid>

            <StyledBottomWrapper>
              <SignInLink />

              <Button
                disabled={isSubmitting}
                rounded
                styleType="bordered"
                type="submit"
              >
                {'Sign up'}
              </Button>
            </StyledBottomWrapper>
          </Form>
        )}
      />
    );
  }
}

SignUpForm.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = { alertSetAction: alertSet };

export default compose(
  connect(null, mapDispatchToProps),
  withFirebase,
  withRouter,
)(SignUpForm);
