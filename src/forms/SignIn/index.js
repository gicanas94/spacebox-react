import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import { ERRORS, ROUTES } from '../../constants';
import Input from '../../components/Input';

const StyledLink = styled(Link)`
  font-size: ${({ theme }) => theme.forms.SignIn.forgotPasswordLink.fontSize};
`;

const StyledBottomWrapper = styled.div`
  display: flex;
  flex-direction: column;

  a {
    margin-bottom: 25px;
    text-align: center;
  }

  button {
    margin-bottom: 25px;
    width: 100%;
  }
`;

const SignInForm = ({ alertSetAction, firebase, history }) => {
  const SignInFormSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email('yup.emailInvalid')
      .required('yup.required'),
    password: Yup.string().trim().required('yup.required'),
  });

  const handleSubmit = (values, actions) => {
    const { email, password } = values;

    alertSetAction();

    firebase.doSignInWithEmailAndPassword(email, password)
      .then(() => history.push(ROUTES.HOME))
      .catch((error) => {
        alertSetAction({
          message: error.code === ERRORS.FIREBASE.ACCOUNT_EXISTS.CODE
            ? { id: ERRORS.FIREBASE.ACCOUNT_EXISTS.MESSAGE }
            : error.message,
          type: 'danger',
        });

        actions.setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        rememberAccess: false,
      }}
      onSubmit={handleSubmit}
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
            label="forms.signIn.labels.emailInput"
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
            label="forms.signIn.labels.passwordInput"
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
            label="forms.signIn.labels.rememberAccessCheckbox"
            margin="0 0 25px 0"
            onChangeHandler={() => setFieldValue(
              'rememberAccess',
              !values.rememberAccess,
            )}
            rounded
          />

          <StyledBottomWrapper>
            <Button
              disabled={isSubmitting}
              rounded
              styleType="filled"
              type="submit"
            >
              {'forms.signIn.submitButton'}
            </Button>

            <StyledLink to={ROUTES.PASSWORD_FORGET}>
              <FormattedMessage id="forms.signIn.forgotPasswordLink" />
            </StyledLink>
          </StyledBottomWrapper>
        </Form>
      )}
    />
  );
};

SignInForm.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SignInForm;
