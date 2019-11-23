import * as Yup from 'yup';
import _ from 'lodash';
import autosize from 'autosize';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import { alertSet } from '../../Redux/actions';
import Button from '../../components/Button';
import { color, device, transition } from '../../styles';
import { withFirebase } from '../../Firebase';

const StyledWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;

  textarea {
    margin-bottom: 25px;
  }

  button {
    width: 100%;
  }

  @media ${device.mobileL} {
    flex-direction: row;

    textarea {
      margin-bottom: 0;
      margin-right: 25px;
    }

    button {
      overflow: visible;
      width: fit-content;
    }
  }
`;

const StyledTextarea = styled.textarea`
  background-color: transparent;
  border: 0;
  border-color: ${({ theme }) => theme.forms.Comment.textarea.color.default};
  border-style: solid;
  border-bottom-width: ${({ theme }) => (
    theme.forms.Comment.textarea.borderBottomWidth
  )};
  height: 40px;
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
  authUser,
  firebase,
  postSlug,
  sid,
  textareaId,
  updatePostCommentsHandler,
}) => {
  const intl = useIntl();

  const CommentFormSchema = Yup.object().shape({
    content: Yup.string().trim().required(),
  });

  const handleSubmit = (values, actions) => {
    const createdComment = {
      bgColor: color.specific.commentBgColor[
        Math.floor(Math.random() * color.specific.commentBgColor.length)
      ],
      content: values.content.trim(),
      createdAt: new Date().toISOString(),
      slug: `${_.kebabCase(values.content)}-${Math.floor(Math.random() * 10000)}`,
    };

    const createComment = async () => {
      try {
        alertSetAction();

        const postRef = firebase.post(sid, postSlug);
        const dbAuthUser = await firebase.user(authUser.uid).get();
        const post = await postRef.get();

        createdComment.user = {
          slug: dbAuthUser.data().slug,
          uid: authUser.uid,
          username: dbAuthUser.data().username,
        };

        await postRef.update(
          { comments: [...post.data().comments, createdComment] },
        );

        updatePostCommentsHandler(createdComment, 'add');
        actions.resetForm();
        autosize.destroy(document.getElementById(textareaId));
      } catch (error) {
        alertSetAction({
          message: error.message,
          type: 'danger',
        });

        Object.keys(values).map(field => actions.setFieldTouched(field, false));

        actions.setSubmitting(false);
      }
    };

    createComment();
  };

  useEffect(() => {
    autosize(document.getElementById(textareaId));

    return () => {
      autosize.destroy(document.getElementById(textareaId));
    };
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
              id={textareaId}
              name="content"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder={intl.formatMessage({
                id: 'forms.comment.contentTextareaPlaceholder',
              })}
              value={values.content}
            />

            <Button
              disabled={isSubmitting}
              rounded
              size="small"
              styleType="bordered"
              type="submit"
            >
              {'forms.comment.submitButton'}
            </Button>
          </StyledWrapper>
        </Form>
      )}
    />
  );
};

CommentForm.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.objectOf(PropTypes.any).isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  postSlug: PropTypes.string.isRequired,
  sid: PropTypes.string.isRequired,
  textareaId: PropTypes.string.isRequired,
  updatePostCommentsHandler: PropTypes.func.isRequired,
};

const mapDispatchToProps = { alertSetAction: alertSet };

export default compose(
  connect(null, mapDispatchToProps),
  withFirebase,
)(CommentForm);
