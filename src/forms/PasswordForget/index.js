import * as Yup from 'yup';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { alertSet } from '../../Redux/actions';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { withFirebase } from '../../Firebase';

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const PasswordForgetForm = ({ alertSetAction, firebase }) => {
  const PasswordForgetFormSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email('yup.emailInvalid')
      .required('yup.required'),
  });

  const handleSubmit = (values, actions) => {
    const { email } = values;

    const resetPassword = async () => {
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

        Object.keys(values).map(field => actions.setFieldTouched(field, false));

        actions.setSubmitting(false);
      }
    };

    resetPassword();
  };

  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={handleSubmit}
      validationSchema={PasswordForgetFormSchema}
      render={({
        errors,
        handleBlur,
        handleChange,
        isSubmitting,
        touched,
        values,
      }) => (
        <Form>
          <Input
            autoFocus
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
              rounded
              styleType="filled"
              type="submit"
            >
              {'forms.passwordForget.submitButton'}
            </Button>
          </StyledButtonWrapper>
        </Form>
      )}
    />
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
