import * as Yup from 'yup';
import _ from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Recaptcha from 'react-recaptcha';
import styled from 'styled-components';

import { alertSet } from '../../redux/actions';
import Button from '../../components/Button';
import { defineAppLocale } from '../../utils';
import { device } from '../../styles';
import Input from '../../components/Input';
import { ROUTES } from '../../constants';
import { withFirebase } from '../../firebase';

const StyledGrid = styled.div`
  display: grid;
  grid-column-gap: 25px;
  grid-template-columns: 1fr;
  width: inherit;

  @media ${device.tablet} {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, auto);
  }
`;

const StyledLink = styled(Link)`
  font-size: ${({ theme }) => theme.forms.signUp.signInLink.fontSize};
`;

const StyledTermsOfUseNotice = styled.p`
  color: ${({ theme }) => theme.forms.signUp.termsOfUseNotice.color};
  font-size: ${({ theme }) => theme.forms.signUp.termsOfUseNotice.fontSize};
`;

const StyledBottomWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;

  a {
    text-align: center;
  }

  button {
    margin-bottom: 25px;
    width: 100%;
  }

  @media ${device.mobileL} {
    align-items: flex-end;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    button {
      margin-bottom: 0;
      width: fit-content;
    }
  }
`;

const SignUpForm = ({ alertSetAction, authUser, firebase }) => {
  const intl = useIntl();
  const history = useHistory();
  const location = useLocation();
  const minimumPasswordCharacters = 6;
  const minimumUsernameCharacters = 4;
  const maximumUsernameCharacters = 25;
  let recaptchaInstance;

  const SignUpFormSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email('yup.emailInvalid')
      .required('yup.required'),
    passwordOne: Yup.string()
      .trim()
      .required('yup.required')
      .min(
        minimumPasswordCharacters,
        intl.formatMessage(
          { id: 'yup.minimumCharacters' },
          { characters: minimumPasswordCharacters },
        ),
      ),
    passwordTwo: Yup.string()
      .trim()
      .required('yup.required')
      .oneOf([Yup.ref('passwordOne'), null], 'yup.passwordsMustMatch'),
    username: Yup.string()
      .trim()
      .min(
        minimumUsernameCharacters,
        intl.formatMessage(
          { id: 'yup.minimumCharacters' },
          { characters: minimumUsernameCharacters },
        ),
      )
      .max(
        maximumUsernameCharacters,
        intl.formatMessage(
          { id: 'yup.maximumCharacters' },
          { characters: maximumUsernameCharacters },
        ),
      )
      .required('yup.required'),
    recaptcha: Yup.string().required(),
  });

  const handleSubmit = (values, actions) => {
    if (authUser) return;

    const { email, passwordOne, username } = values;

    (async () => {
      try {
        alertSetAction();

        const createdAuthUser = await firebase.doCreateUserWithEmailAndPassword(
          email,
          passwordOne,
        );

        await firebase.user(createdAuthUser.user.uid).set({
          createdAt: new Date().toISOString(),
          language: defineAppLocale(),
          slug: `${_.kebabCase(username)}-${Math.floor(Math.random() * 10000)}`,
          username,
        });

        await firebase.userRestrictedData(createdAuthUser.user.uid).set({
          isAdmin: false,
        });

        await firebase.doSendEmailVerification();

        alertSetAction({
          message: { id: 'forms.signUp.successAlertMessage' },
          type: 'success',
        });

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
          message: error.message,
          type: 'danger',
        });

        Object.keys(values).map((field) =>
          actions.setFieldTouched(field, false),
        );

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
        passwordOne: '',
        passwordTwo: '',
        username: '',
        recaptcha: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={SignUpFormSchema}
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
          <StyledGrid>
            <Input
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
                errors.passwordOne && touched.passwordOne && errors.passwordOne
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
                errors.passwordTwo && touched.passwordTwo && errors.passwordTwo
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
                    <Link target="_blank" to={ROUTES.TERMS_OF_USE}>
                      <FormattedMessage id="forms.signUp.links.termsOfUse" />
                    </Link>
                  </span>
                ),
              }}
            />
          </StyledTermsOfUseNotice>

          <StyledBottomWrapper>
            <StyledLink
              to={{
                pathname: ROUTES.SIGN_IN,
                search: location.search ? location.search : null,
              }}
            >
              <FormattedMessage id="forms.signUp.links.signIn" />
            </StyledLink>

            <Button
              disabled={isSubmitting || authUser === true}
              styleType="filled"
              type="submit"
            >
              forms.signUp.submitButton
            </Button>
          </StyledBottomWrapper>

          <Recaptcha
            ref={(event) => {
              recaptchaInstance = event;
            }}
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

SignUpForm.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({ authUser: state.authUser });

const mapDispatchToProps = { alertSetAction: alertSet };

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase,
)(SignUpForm);
