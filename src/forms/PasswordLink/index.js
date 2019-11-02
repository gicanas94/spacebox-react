import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Button from '../../components/Button';
import { device } from '../../styles';
import Input from '../../components/Input';

const PasswordLinkFormSchema = Yup.object().shape({
  passwordOne: Yup.string()
    .trim()
    .required('This field is required!')
    .min(6, 'The minimum of characters for this field is 6'),
  passwordTwo: Yup.string()
    .trim()
    .required('This field is required!')
    .oneOf([Yup.ref('passwordOne'), null], 'Passwords must match'),
});

const StyledWrapper = styled.div`
  width: 100%;

  ${({ page }) => page === 'changePassword' && `
    padding-top: 0;
  `};

  ${({ page }) => page === 'loginManagement' && `
    padding-top: 25px;
  `};
`;

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

const PasswordLinkForm = ({
  alertSetAction,
  authUserEmail,
  fetchSignInMethodsHandler,
  firebase,
  page,
  setPasswordLinkFormIsVisibleHandler,
}) => {
  const handleSubmit = (values) => {
    const { passwordOne } = values;

    alertSetAction();

    const credential = firebase.emailAuthProvider.credential(
      authUserEmail,
      passwordOne,
    );

    firebase.auth.currentUser
      .linkAndRetrieveDataWithCredential(credential)
      .then(() => {
        setPasswordLinkFormIsVisibleHandler(false);
        fetchSignInMethodsHandler();

        alertSetAction({
          text: 'Congratulations! You just linked a password to your account.',
          type: 'success',
        });
      })
      .catch((error) => {
        alertSetAction({
          text: error.message,
          type: 'danger',
        });

        setPasswordLinkFormIsVisibleHandler(false);
      });
  };

  return (
    <StyledWrapper page={page}>
      <Formik
        initialValues={{
          passwordOne: '',
          passwordTwo: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={PasswordLinkFormSchema}
        render={({
          errors,
          handleBlur,
          handleChange,
          isSubmitting,
          touched,
          values,
        }) => (
          <Form>
            <StyledNewPasswordWrapper>
              <Input
                disabled={isSubmitting}
                error={
                  errors.passwordOne
                  && touched.passwordOne
                  && errors.passwordOne
                }
                label="New password"
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
                label="Confirm password"
                name="passwordTwo"
                onBlur={handleBlur}
                onChange={handleChange}
                rounded
                success={!errors.passwordTwo && touched.passwordTwo}
                type="password"
                value={values.passwordTwo}
              />
            </StyledNewPasswordWrapper>

            <Button
              disabled={isSubmitting}
              fullWidth
              margin="25px 0 0 0"
              rounded
              styleType="filled"
              type="submit"
            >
              {'Done'}
            </Button>
          </Form>
        )}
      />
    </StyledWrapper>
  );
};

PasswordLinkForm.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUserEmail: PropTypes.string.isRequired,
  fetchSignInMethodsHandler: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  page: PropTypes.oneOf(['changePassword', 'loginManagement']).isRequired,
  setPasswordLinkFormIsVisibleHandler: PropTypes.func,
};

PasswordLinkForm.defaultProps = {
  setPasswordLinkFormIsVisibleHandler: () => true,
};
export default PasswordLinkForm;
