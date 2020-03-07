import * as Yup from 'yup';
import _ from 'lodash';
import autosize from 'autosize';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Button from '../../components/Button';
import { device } from '../../styles';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';

const StyledButtonsWrapper = styled.div`
  button {
    width: 100%;
  }

  @media ${device.tablet} {
    button {
      margin: 0 0 0 auto;
      width: fit-content;
    }
  }
`;

const PostForm = ({
  alertSetAction,
  createPostCallback,
  firebase,
  sid,
  uid,
}) => {
  const PostFormSchema = Yup.object().shape({
    title: Yup.string().trim().required('yup.required'),
    content: Yup.string().trim().required('yup.required'),
  });

  const handleSubmit = (values, actions) => {
    const { title, content } = values;

    const createdPost = {
      content: content.trim(),
      comments: [],
      createdAt: new Date().toISOString(),
      likes: [],
      sid,
      slug: `${_.kebabCase(title)}-${Math.floor(Math.random() * 10000)}`,
      title: title.trim(),
      uid,
    };

    (async () => {
      try {
        alertSetAction();

        await firebase.post(sid, createdPost.slug).set(createdPost);

        createPostCallback(createdPost);
        actions.resetForm();
        autosize.destroy(document.getElementById('textarea-component_content'));
        autosize(document.getElementById('textarea-component_content'));
      } catch (error) {
        alertSetAction({
          message: error.message,
          type: 'danger',
        });

        Object.keys(values).map(field => actions.setFieldTouched(field, false));

        actions.setSubmitting(false);
      }
    })();
  };

  return (
    <Formik
      initialValues={{
        content: '',
        title: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={PostFormSchema}
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
            <Button disabled={isSubmitting} styleType="filled" type="submit">
              {'forms.post.submitButton'}
            </Button>
          </StyledButtonsWrapper>
        </Form>
      )}
    </Formik>
  );
};

PostForm.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  createPostCallback: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  sid: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
};

export default PostForm;
