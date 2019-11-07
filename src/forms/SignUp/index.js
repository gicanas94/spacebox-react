import * as Yup from 'yup';
import _ from 'lodash';
import { compose } from 'recompose';
import { Form, Formik } from 'formik';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Button from '../../components/Button';
import { device } from '../../styles';
import Input from '../../components/Input';
import { ROUTES } from '../../constants';
import { withFirebase } from '../../Firebase';

const StyledGrid = styled.div`
  display: grid;
  grid-column-gap: 25px;
  grid-template-columns: 1fr;
  width: inherit;

  @media ${device.mobileL} {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
`;

const StyledLink = styled(Link)`
  font-size: ${({ theme }) => theme.forms.SignUp.signInLink.fontSize};
`;

const StyledTermsOfUseNotice = styled.p`
  color: ${({ theme }) => theme.forms.SignUp.termsOfUseNotice.color};
  font-size: ${({ theme }) => theme.forms.SignUp.termsOfUseNotice.fontSize};
`;

const StyledBottomWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
`;

const SignUpForm = ({
  alertSetAction,
  firebase,
  history,
}) => {
  const intl = useIntl();
  const minimumPasswordCharacters = 6;
  const minimumUsernameCharacters = 4;
  const maximumUsernameCharacters = 25;

  const SignUpFormSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email('yup.emailInvalid')
      .required('yup.required'),
    passwordOne: Yup.string()
      .trim()
      .required('yup.required')
      .min(minimumPasswordCharacters, intl.formatMessage(
        { id: 'yup.minimumCharacters' },
        { characters: minimumPasswordCharacters },
      )),
    passwordTwo: Yup.string()
      .trim()
      .required('yup.required')
      .oneOf([Yup.ref('passwordOne'), null], 'yup.passwordsMustMatch'),
    username: Yup.string()
      .trim()
      .min(minimumUsernameCharacters, intl.formatMessage(
        { id: 'yup.minimumCharacters' },
        { characters: minimumUsernameCharacters },
      ))
      .max(maximumUsernameCharacters, intl.formatMessage(
        { id: 'yup.maximumCharacters' },
        { characters: maximumUsernameCharacters },
      ))
      .required('yup.required'),
  });

  const handleSubmit = (values, actions) => {
    const { email, passwordOne, username } = values;

    alertSetAction();

    firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => (
        firebase.getUser(authUser.user.uid).set({
          createdAt: new Date().toISOString(),
          email,
          isAdmin: false,
          slug: `${_.kebabCase(username)}-${Math.floor(Math.random() * 10000)}`,
          username,
        })
      ))
      .then(() => {
        firebase.doSendEmailVerification();

        alertSetAction({
          message: { id: 'forms.signUp.successAlertMessage' },
          type: 'success',
        });

        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        alertSetAction({
          message: error.message,
          type: 'danger',
        });

        actions.setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={{
        email: '',
        passwordOne: '',
        passwordTwo: '',
        username: '',
      }}
      onSubmit={handleSubmit}
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
            <Input
              autoFocus
              disabled={isSubmitting}
              error={errors.username && touched.username && errors.username}
              label="forms.signUp.labels.usernameInput"
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
              label="forms.signUp.labels.emailInput"
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
              error={
                errors.passwordOne
                && touched.passwordOne
                && errors.passwordOne
              }
              label="forms.signUp.labels.passwordOneInput"
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
              label="forms.signUp.labels.passwordTwoInput"
              margin="0 0 25px 0"
              name="passwordTwo"
              onBlur={handleBlur}
              onChange={handleChange}
              rounded
              success={!errors.passwordTwo && touched.passwordTwo}
              type="password"
              value={values.passwordTwo}
            />
          </StyledGrid>

          <StyledTermsOfUseNotice>
            <FormattedMessage
              id="forms.signUp.termsOfUseNotice"
              values={{
                termsOfUseLink: (
                  <span>
                    <Link to={ROUTES.TERMS_OF_USE}>
                      <FormattedMessage id="forms.signUp.links.termsOfUse" />
                    </Link>
                  </span>
                ),
              }}
            />
          </StyledTermsOfUseNotice>

          <StyledBottomWrapper>
            <StyledLink to={ROUTES.SIGN_IN}>Sign in instead?</StyledLink>

            <Button
              disabled={isSubmitting}
              rounded
              styleType="bordered"
              type="submit"
            >
              {'forms.signUp.submitButton'}
            </Button>
          </StyledBottomWrapper>
        </Form>
      )}
    />
  );
};

SignUpForm.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default compose(withFirebase, withRouter)(SignUpForm);
