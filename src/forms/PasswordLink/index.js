import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import Button from '../../components/Button';
import { device } from '../../styles';
import Input from '../../components/Input';

const StyledWrapper = styled.div`
  width: 100%;
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
  firebase,
  getSignInMethodsHandler,
  isLoadingSetAction,
  setPasswordLinkFormIsVisibleHandler,
}) => {
  const intl = useIntl();
  const minimumPasswordCharacters = 6;

  const PasswordLinkFormSchema = Yup.object().shape({
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

  const handleSubmit = (values, actions) => {
    const { passwordOne } = values;

    (async () => {
      try {
        alertSetAction();

        const credential = firebase.emailAuthProvider.credential(
          authUserEmail,
          passwordOne,
        );

        await firebase.doLinkAndRetrieveDataWithCredential(credential);
        isLoadingSetAction(true);
        await getSignInMethodsHandler();

        setPasswordLinkFormIsVisibleHandler(false);

        alertSetAction({
          message: { id: 'forms.passwordLink.successAlertMessage' },
          type: 'success',
        });
      } catch (error) {
        alertSetAction({
          message: error.message,
          type: 'danger',
        });

        Object.keys(values).map(field => actions.setFieldTouched(field, false));

        actions.setSubmitting(false);

        setPasswordLinkFormIsVisibleHandler(false);
      } finally {
        isLoadingSetAction(false);
      }
    })();
  };

  return (
    <StyledWrapper>
      <Formik
        initialValues={{
          passwordOne: '',
          passwordTwo: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={PasswordLinkFormSchema}
      >
        {({
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
                label="forms.passwordLink.labels.passwordOneInput"
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
                label="forms.passwordLink.labels.passwordTwoInput"
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
              className="passwordLinkFormSubmitButton"
              disabled={isSubmitting}
              fullWidth
              margin="25px 0 0 0"
              rounded
              styleType="filled"
              type="submit"
            >
              {'forms.passwordLink.submitButton'}
            </Button>
          </Form>
        )}
      </Formik>
    </StyledWrapper>
  );
};

PasswordLinkForm.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUserEmail: PropTypes.string.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  getSignInMethodsHandler: PropTypes.func.isRequired,
  isLoadingSetAction: PropTypes.func.isRequired,
  setPasswordLinkFormIsVisibleHandler: PropTypes.func,
};

PasswordLinkForm.defaultProps = {
  setPasswordLinkFormIsVisibleHandler: () => true,
};

export default PasswordLinkForm;
