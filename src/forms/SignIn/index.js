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
import Checkbox from '../../components/Checkbox';
import { ERRORS, ROUTES } from '../../constants';
import Input from '../../components/Input';
import { PasswordForgetLink } from '../../pages/SignIn';
import { withFirebase } from '../../Firebase';

const SignInFormSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please check your e-mail')
    .required('This field is required!'),
  password: Yup.string().required('This field is required!'),
});

const StyledBottomWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
`;

class SignInForm extends Component {
  handleSubmit = (values, actions) => {
    const { alertSetAction, firebase, history } = this.props;
    const { email, password } = values;

    alertSetAction(null);
    actions.setSubmitting(true);

    firebase.doSignInWithEmailAndPassword(email, password)
      .then(() => history.push(ROUTES.HOME))
      .catch((error) => {
        alertSetAction({
          text: error.code === ERRORS.FIREBASE.ACCOUNT_EXISTS.CODE
            ? ERRORS.FIREBASE.ACCOUNT_EXISTS.MESSAGE
            : error.message,
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
          password: '',
          rememberAccess: false,
        }}
        onSubmit={this.handleSubmit}
        validationSchema={SignInFormSchema}
        render={({
          errors,
          handleBlur,
          handleChange,
          isSubmitting,
          setFieldValue,
          touched,
          values,
        }) => (
          <Form>
            <Input
              autoFocus
              disabled={isSubmitting}
              error={errors.email && touched.email && errors.email}
              label="E-mail"
              margin="0 0 25px 0"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              rounded
              success={!errors.email && touched.email}
              type="text"
              value={values.email}
            />

            <Input
              disabled={isSubmitting}
              error={errors.password && touched.password && errors.password}
              label="Password"
              margin="0 0 25px 0"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              rounded
              success={!errors.password && touched.password}
              type="password"
              value={values.password}
            />

            <Checkbox
              checked={values.rememberAccess}
              disabled={isSubmitting}
              label="Remember this access"
              margin="0 0 25px 0"
              onChangeHandler={() => setFieldValue(
                'rememberAccess',
                !values.rememberAccess,
              )}
              rounded
            />

            <StyledBottomWrapper>
              <PasswordForgetLink />

              <Button
                disabled={isSubmitting}
                rounded
                styleType="bordered"
                type="submit"
              >
                {'Sign in'}
              </Button>
            </StyledBottomWrapper>
          </Form>
        )}
      />
    );
  }
}

SignInForm.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = { alertSetAction: alertSet };

export default compose(
  connect(null, mapDispatchToProps),
  withFirebase,
  withRouter,
)(SignInForm);
