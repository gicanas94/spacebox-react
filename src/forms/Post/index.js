import * as Yup from 'yup';
import _ from 'lodash';
import autosize from 'autosize';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Box from '../../components/Box';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';

const StyledButtonsWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
`;

const PostForm = ({ alertSetAction, firebase, sid }) => {
  const PostFormSchema = Yup.object().shape({
    title: Yup.string().trim().required('yup.required'),
    content: Yup.string().trim().required('yup.required'),
  });

  const handleSubmit = (values, actions) => {
    const { title, content } = values;

    alertSetAction();

    firebase.createPost(
      {
        comments: [],
        content: content.trim(),
        createdAt: new Date().toISOString(),
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
          message: error.message,
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
              label="forms.post.labels.title"
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
              label="forms.post.labels.content"
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
                {'forms.post.submitButton'}
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

export default PostForm;
