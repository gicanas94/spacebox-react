import * as Yup from 'yup';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import { alertSet } from '../../Redux/actions';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { withFirebase } from '../../Firebase';

const PasswordForgetFormSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please check your e-mail')
    .required('This field is required!'),
});

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

class PasswordForgetForm extends Component {
  handleSubmit = (values, actions) => {
    const { alertSetAction, firebase } = this.props;
    const { email } = values;

    alertSetAction(null);
    actions.setSubmitting(true);

    firebase.doPasswordReset(email)
      .then(() => {
        alertSetAction({
          text: `We sent you an e-mail so you can reset your password.
            We hope everything goes well!`,
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
  };

  render() {
    return (
      <Formik
        initialValues={{ email: '' }}
        onSubmit={this.handleSubmit}
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
              label="E-mail"
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
                {'Send'}
              </Button>
            </StyledButtonWrapper>
          </Form>
        )}
      />
    );
  }
}

PasswordForgetForm.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = { alertSetAction: alertSet };

export default compose(
  connect(null, mapDispatchToProps),
  withFirebase,
)(PasswordForgetForm);
