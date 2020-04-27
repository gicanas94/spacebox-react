import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { FormattedMessage } from 'react-intl';
import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Recaptcha from 'react-recaptcha';
import styled from 'styled-components';

import Button from '../../components/Button';
import { ERRORS, ROUTES } from '../../constants';
import Input from '../../components/Input';

const StyledLink = styled(Link)`
  font-size: ${({ theme }) => theme.forms.signIn.forgotPasswordLink.fontSize};
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

const SignInForm = ({ alertSetAction, firebase }) => {
  let recaptchaInstance;
  const history = useHistory();
  const location = useLocation();

  const SignInFormSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email('yup.emailInvalid')
      .required('yup.required'),
    password: Yup.string().trim().required('yup.required'),
    recaptcha: Yup.string().required(),
  });

  const handleSubmit = (values, actions) => {
    const { email, password } = values;

    (async () => {
      try {
        alertSetAction();

        await firebase.doSignInWithEmailAndPassword(email, password);

        if (location.search) {
          const searchParams = queryString.parse(location.search);

          if (searchParams.returnUrl) {
            history.push(searchParams.returnUrl);
          } else {
            history.push(ROUTES.HOME);
          }
        } else {
          history.push(ROUTES.HOME);
        }
      } catch (error) {
        alertSetAction({
          message: error.code === ERRORS.FIREBASE.ACCOUNT_EXISTS.CODE
            ? { id: ERRORS.FIREBASE.ACCOUNT_EXISTS.MESSAGE }
            : error.message,
          type: 'danger',
        });

        Object.keys(values).map((field) => actions.setFieldTouched(field, false));

        actions.setSubmitting(false);
      }
    })();
  };

  useEffect(() => {
    recaptchaInstance.execute();
  }, []);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        rememberAccess: false,
        recaptcha: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={SignInFormSchema}
    >
      {({
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

          <StyledBottomWrapper>
            <Button disabled={isSubmitting} styleType="filled" type="submit">
              forms.signIn.submitButton
            </Button>

            <StyledLink
              to={{
                pathname: ROUTES.SIGN_UP,
                search: location.search ? location.search : null,
              }}
            >
              <FormattedMessage id="forms.signIn.signUpLink" />
            </StyledLink>

            <StyledLink to={ROUTES.PASSWORD_FORGET}>
              <FormattedMessage id="forms.signIn.forgotPasswordLink" />
            </StyledLink>
          </StyledBottomWrapper>

          <Recaptcha
            ref={(event) => { recaptchaInstance = event; }}
            sitekey="6LckUOIUAAAAAI_iOY8S2ibbmag3WQIN_LzNHE8d"
            size="invisible"
            verifyCallback={(response) => {
              setFieldValue('recaptcha', response);
            }}
          />
        </Form>
      )}
    </Formik>
  );
};

SignInForm.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SignInForm;
