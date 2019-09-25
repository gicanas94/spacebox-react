import * as Yup from 'yup';
import _ from 'lodash';
import autosize from 'autosize';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { alertSet } from '../../Redux/actions';
import Button from '../../components/Button';
import { color, transition } from '../../styles';
import { withFirebase } from '../../Firebase';

const CommentFormSchema = Yup.object().shape({
  content: Yup.string().required(),
});

const StyledWrapper = styled.div`
  align-items: flex-end;
  display: flex;
`;

const StyledTextarea = styled.textarea`
  background-color: transparent;
  border: 0;
  border-color: ${({ theme }) => theme.forms.Comment.textarea.color.default};
  border-style: solid;
  border-bottom-width: ${({ theme }) => (
    theme.forms.Comment.textarea.borderWidth
  )};
  height: 40px;
  margin-right: 25px;
  padding: 5px;
  resize: none;
  transition: border ${transition.speed.superfast} linear;
  width: 100%;

  &:focus {
    border-color: ${({ theme }) => theme.forms.Comment.textarea.color.focus};
    outline: none;
  }

  ${({ disabled, theme }) => disabled && `
    border-color: ${theme.forms.Comment.textarea.color.disabled} !important;
    color: ${theme.forms.Comment.textarea.color.disabled} !important;

    ::placeholder {
      color: ${theme.forms.Comment.textarea.color.disabled} !important;
    }

    :-ms-input-placeholder {
      color: ${theme.forms.Comment.textarea.color.disabled} !important;
    }

    ::-ms-input-placeholder {
      color: ${theme.forms.Comment.textarea.color.disabled} !important;
    }
  `}
`;

const CommentForm = ({
  alertSetAction,
  firebase,
  postSlug,
  sid,
  user,
}) => {
  const handleSubmit = (values, actions) => {
    const { content } = values;
    const postRef = firebase.getPost(sid, postSlug);

    alertSetAction();

    postRef.get()
      .then((document) => {
        const postComments = document.data().comments;

        postComments.push({
          bgColor: color.specific.commentBgColor[
            Math.floor(Math.random() * color.specific.commentBgColor.length)
          ],
          content,
          createdAt: moment().valueOf(),
          slug: `${_.kebabCase(content)}-${Math.floor(Math.random() * 10000)}`,
          user,
        });

        postRef.update({ comments: postComments });
      })
      .then(() => {
        actions.resetForm();
        actions.setSubmitting(false);
        autosize.destroy(document.querySelectorAll('textarea'));
      })
      .catch((error) => {
        alertSetAction({
          text: error.message,
          type: 'danger',
        });

        actions.setSubmitting(false);
      });
  };

  useEffect(() => {
    autosize(document.querySelectorAll('textarea'));

    return () => autosize.destroy(document.querySelectorAll('textarea'));
  }, []);

  return (
    <Formik
      initialValues={{ content: '' }}
      onSubmit={handleSubmit}
      validationSchema={CommentFormSchema}
      render={({
        handleBlur,
        handleChange,
        isSubmitting,
        values,
      }) => (
        <Form>
          <StyledWrapper>
            <StyledTextarea
              disabled={isSubmitting}
              id={postSlug}
              name="content"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Make a comment..."
              value={values.content}
            />

            <Button
              disabled={isSubmitting}
              rounded
              size="small"
              styleType="bordered"
              type="submit"
            >
              {'Comment'}
            </Button>
          </StyledWrapper>
        </Form>
      )}
    />
  );
};

CommentForm.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  postSlug: PropTypes.string.isRequired,
  sid: PropTypes.string.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = { alertSetAction: alertSet };

export default compose(
  connect(null, mapDispatchToProps),
  withFirebase,
)(CommentForm);
