import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '../../components/Button';
import { ERRORS } from '../../constants';
import Input from '../../components/Input';
import Hr from '../../components/Hr';
import { setCookie, getCookie } from '../../utils';

const PasswordChangeFormSchema = Yup.object().shape({
  password: Yup.string().trim().required('This field is required!'),
  passwordOne: Yup.string()
    .trim()
    .required('This field is required!')
    .min(6, 'The minimum of characters for this field is 6'),
  passwordTwo: Yup.string()
    .trim()
    .required('This field is required!')
    .oneOf([Yup.ref('passwordOne'), null], 'Passwords must match'),
});

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const PasswordChangeForm = ({ alertSetAction, authUser, firebase }) => {
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
      .catch((error) => {
        if (error.code === ERRORS.FIREBASE.WRONG_PASSWORD.CODE) {
          actions.setStatus({
            currentPasswordIsWrong: 'Your current password is wrong',
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
              text: `You reached the limit of attempts to enter your current password,
                please try again later.`,
              type: 'danger',
            });
          }
        } else {
          alertSetAction({
            text: error.message,
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
};

PasswordChangeForm.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.objectOf(PropTypes.any).isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PasswordChangeForm;
