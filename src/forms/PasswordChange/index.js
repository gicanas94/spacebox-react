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

const PasswordChangeFormSchema = Yup.object().shape({
  passwordOne: Yup.string()
    .required('This field is required!')
    .min(6, 'The minimum of characters for this field is 6'),
  passwordTwo: Yup.string()
    .required('This field is required!')
    .oneOf([Yup.ref('passwordOne'), null], 'Passwords must match'),
});

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

class PasswordChangeForm extends Component {
  handleSubmit = (values, actions) => {
    const { alertSetAction, firebase } = this.props;
    const { passwordOne } = values;

    alertSetAction(null);
    actions.setSubmitting(true);

    firebase
      .doPasswordUpdate(passwordOne)
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
  };

  render() {
    return (
      <Formik
        initialValues={{
          passwordOne: '',
          passwordTwo: '',
        }}
        onSubmit={this.handleSubmit}
        validationSchema={PasswordChangeFormSchema}
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
              error={
                errors.passwordOne
                && touched.passwordOne
                && errors.passwordOne
              }
              label="Password"
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
              label="Confirm your password"
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
                disabled={isSubmitting}
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
  }
}

PasswordChangeForm.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = { alertSetAction: alertSet };

export default compose(
  connect(null, mapDispatchToProps),
  withFirebase,
)(PasswordChangeForm);
