import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import Button from '../../components/Button';
import { device } from '../../styles';
import { ERRORS } from '../../constants';
import Input from '../../components/Input';
import Hr from '../../components/Hr';
import { setCookie, getCookie } from '../../utils';

const StyledNewPasswordWrapper = styled.div`
  & > div:first-of-type {
    margin-bottom: 25px;
  }

  @media ${device.mobileL} {
    display: flex;

    & > div:first-of-type {
      margin-bottom: 0;
      margin-right: 25px;
    }

    & > * {
      width: 50%;
    }
  }
`;

const StyledCurrentPasswordAndButtonWrapper = styled.div`
  & > div {
    margin-bottom: 25px;
  }

  @media ${device.mobileL} {
    display: flex;
    justify-content: space-between;

    button {
      margin-top: 24px;
    }

    & > div {
      margin-bottom: 0;
      margin-right: 25px;
    }

    & > * {
      width: 50%;
    }
  }
`;

const PasswordChangeForm = ({
  alertSetAction,
  authUser,
  firebase,
}) => {
  const intl = useIntl();
  const minimumPasswordCharacters = 6;

  const PasswordChangeFormSchema = Yup.object().shape({
    password: Yup.string().trim().required('yup.required'),
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
  });

  const [currentPasswordAttemps, setCurrentPasswordAttemps] = useState(0);

  const [
    reachedMaxCurrentPasswordAttemps,
    setReachedMaxCurrentPasswordAttemps,
  ] = useState(getCookie('reachedMaxCurrentPasswordAttemps', false));

  const handleSubmit = (values, actions) => {
    const { password, passwordOne } = values;

    alertSetAction();

    firebase.doSignInWithEmailAndPassword(authUser.email, password)
      .then(() => {
        firebase.doPasswordUpdate(passwordOne)
          .then(() => {
            alertSetAction({
              message: { id: 'forms.passwordChange.successAlertMessage' },
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
      .catch((error) => {
        if (error.code === ERRORS.FIREBASE.WRONG_PASSWORD.CODE) {
          actions.setStatus({
            currentPasswordIsWrong: ERRORS.FIREBASE.WRONG_PASSWORD.MESSAGE,
          });

          setCurrentPasswordAttemps(currentPasswordAttemps + 1);

          if (currentPasswordAttemps === 2) {
            setCookie(
              'reachedMaxCurrentPasswordAttemps',
              '',
              new Date(new Date().getTime() + 30 * 60 * 1000).toGMTString(),
            );

            setReachedMaxCurrentPasswordAttemps(true);
            actions.resetForm();

            alertSetAction({
              message: {
                id: 'forms.passwordChange.reachedMaxCurrentPasswordAttempsAlertMessage',
              },
              type: 'danger',
            });
          }
        } else {
          alertSetAction({
            message: error.message,
            type: 'danger',
          });
        }

        actions.setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={{
        password: '',
        passwordOne: '',
        passwordTwo: '',
      }}
      onSubmit={handleSubmit}
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
          <StyledNewPasswordWrapper>
            <Input
              autoFocus
              disabled={isSubmitting || reachedMaxCurrentPasswordAttemps}
              error={
                errors.passwordOne
                && touched.passwordOne
                && errors.passwordOne
              }
              label="forms.passwordChange.labels.passwordOneInput"
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
              label="forms.passwordChange.labels.passwordTwoInput"
              name="passwordTwo"
              onBlur={handleBlur}
              onChange={handleChange}
              rounded
              success={!errors.passwordTwo && touched.passwordTwo}
              type="password"
              value={values.passwordTwo}
            />
          </StyledNewPasswordWrapper>

          <Hr margin="25px 0" />

          <StyledCurrentPasswordAndButtonWrapper>
            <Input
              disabled={isSubmitting || reachedMaxCurrentPasswordAttemps}
              error={
                (errors.password && touched.password && errors.password)
                || (status && status.currentPasswordIsWrong)
                || (status && status.reachedMaxCurrentPasswordAttemps)
              }
              label="forms.passwordChange.labels.passwordInput"
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

            <Button
              disabled={isSubmitting || reachedMaxCurrentPasswordAttemps}
              fullWidth
              rounded
              styleType="filled"
              type="submit"
            >
              {'forms.passwordChange.submitButton'}
            </Button>
          </StyledCurrentPasswordAndButtonWrapper>
        </Form>
      )}
    />
  );
};

PasswordChangeForm.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PasswordChangeForm;
