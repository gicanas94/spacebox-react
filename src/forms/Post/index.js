import * as Yup from 'yup';
import _ from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { alertSet } from '../../Redux/actions';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import { withFirebase } from '../../Firebase';

const PostFormSchema = Yup.object().shape({
  title: Yup.string()
    .required('This field is required!'),
  content: Yup.string()
    .required('This field is required!'),
});

class PostForm extends Component {
  handleSubmit = (values, actions) => {
    const { alertSetAction, firebase, spaceboxId } = this.props;
    const { title, content } = values;

    alertSetAction(null);
    actions.setSubmitting(true);

    firebase.posts().push({
      content,
      createdAt: firebase.serverValue.TIMESTAMP,
      slug: `${_.kebabCase(title)}-${Math.random().toString().slice(-3)}`,
      spaceboxId,
      title,
    })
      .then(() => actions.resetForm())
      .catch(error => (
        alertSetAction({
          text: error.message,
          type: 'danger',
        })
      ));

    actions.setSubmitting(false);
  };

  render() {
    return (
      <Formik
        initialValues={{
          content: '',
          title: '',
        }}
        onSubmit={this.handleSubmit}
        validationSchema={PostFormSchema}
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
              error={errors.title && touched.title && errors.title}
              label="Title"
              margin="0 0 25px 0"
              name="title"
              onBlur={handleBlur}
              onChange={handleChange}
              rounded
              success={!errors.title && touched.title}
              type="text"
              value={values.title}
            />

            <Textarea
              disabled={isSubmitting}
              error={errors.content && touched.content && errors.content}
              label="Content"
              margin="0 0 25px 0"
              name="content"
              onBlur={handleBlur}
              onChange={handleChange}
              rounded
              success={!errors.content && touched.content}
              value={values.content}
            />

            <Button
              disabled={isSubmitting}
              fullWidth
              rounded
              styleType="filled"
              type="submit"
            >
              {'Post'}
            </Button>
          </Form>
        )}
      />
    );
  }
}

PostForm.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  spaceboxId: PropTypes.string.isRequired,
};

const mapDispatchToProps = { alertSetAction: alertSet };

export default compose(
  connect(null, mapDispatchToProps),
  withFirebase,
)(PostForm);
