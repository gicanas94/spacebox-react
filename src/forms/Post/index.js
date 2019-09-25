import * as Yup from 'yup';
import _ from 'lodash';
import autosize from 'autosize';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { alertSet } from '../../Redux/actions';
import Box from '../../components/Box';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import { withFirebase } from '../../Firebase';

const PostFormSchema = Yup.object().shape({
  title: Yup.string().trim().required('This field is required!'),
  content: Yup.string().trim().required('This field is required!'),
});

const StyledButtonsWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
`;

const PostForm = ({ alertSetAction, firebase, sid }) => {
  const handleSubmit = (values, actions) => {
    const { title, content } = values;

    alertSetAction();

    firebase.createPost(
      {
        comments: [],
        content: content.trim(),
        createdAt: moment().valueOf(),
        likes: [],
        sid,
        slug: `${_.kebabCase(title)}-${Math.floor(Math.random() * 10000)}`,
        title: title.trim(),
      },
      sid,
    )
      .then(() => {
        actions.resetForm();
        autosize.destroy(document.getElementById('textarea-component_content'));
      })
      .catch((error) => {
        alertSetAction({
          text: error.message,
          type: 'danger',
        });

        actions.setSubmitting(false);
      });
  };

  return (
    <Box padding="20px">
      <Formik
        initialValues={{
          content: '',
          title: '',
        }}
        onSubmit={handleSubmit}
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
              error={errors.content && touched.content && errors.content}
              disabled={isSubmitting}
              label="Content"
              margin="0 0 25px 0"
              name="content"
              onBlur={handleBlur}
              onChange={handleChange}
              success={!errors.content && touched.content}
              value={values.content}
              rounded
            />

            <StyledButtonsWrapper>
              <Button
                disabled={isSubmitting}
                rounded
                styleType="filled"
                type="submit"
              >
                {'Post'}
              </Button>
            </StyledButtonsWrapper>
          </Form>
        )}
      />
    </Box>
  );
};

PostForm.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  sid: PropTypes.string.isRequired,
};

const mapDispatchToProps = { alertSetAction: alertSet };

export default compose(
  connect(null, mapDispatchToProps),
  withFirebase,
)(PostForm);
