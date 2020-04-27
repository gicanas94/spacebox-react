import * as Yup from 'yup';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Recaptcha from 'react-recaptcha';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { alertSet } from '../../Redux/actions';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { withFirebase } from '../../Firebase';

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  button:first-of-type {
    margin-bottom: 25px;
  }
`;

const PasswordForgetForm = ({ alertSetAction, firebase }) => {
  let recaptchaInstance;
  const history = useHistory();

  const PasswordForgetFormSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email('yup.emailInvalid')
      .required('yup.required'),
    recaptcha: Yup.string().required(),
  });

  const handleSubmit = (values, actions) => {
    const { email } = values;

    (async () => {
      try {
        alertSetAction();

        await firebase.doPasswordReset(email);

        alertSetAction({
          message: { id: 'forms.passwordForget.successAlertMessage' },
          type: 'success',
        });
      } catch (error) {
        alertSetAction({
          message: error.message,
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
        recaptcha: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={PasswordForgetFormSchema}
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
            label="forms.passwordForget.emailInputLabel"
            margin="0 0 25px 0"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            rounded
            success={!errors.email && touched.email}
            type="text"
            value={values.email}
          />

          <StyledButtonWrapper>
            <Button
              disabled={isSubmitting}
              fullWidth
              styleType="bordered"
              type="submit"
            >
              forms.passwordForget.submitButton
            </Button>

            <Button
              color="abalone"
              disabled={isSubmitting}
              fullWidth
              onClick={() => history.goBack()}
              styleType="unbordered"
              type="button"
            >
              forms.passwordForget.backButton
            </Button>
          </StyledButtonWrapper>

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

PasswordForgetForm.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = { alertSetAction: alertSet };

export default compose(
  connect(null, mapDispatchToProps),
  withFirebase,
)(PasswordForgetForm);
