import * as Yup from 'yup';
import _ from 'lodash';
import autosize from 'autosize';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Smile } from 'styled-icons/fa-regular';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import { alertSet } from '../../Redux/actions';
import Button from '../../components/Button';
import { color, device, transition } from '../../styles';
import EmojiPicker from '../../components/EmojiPicker';
import { withFirebase } from '../../Firebase';

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  button {
    margin-top: 25px;
    width: 100%;
  }

  @media ${device.tablet} {
    flex-direction: row;

    button {
      margin-top: 0;
      overflow: visible;
      width: fit-content;
    }
  }
`;

const StyledTextareaAndSmileIconWrapper = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
`;

const StyledTextarea = styled.textarea`
  background-color: transparent;
  border: 0;
  border-color: ${({ theme }) => theme.forms.comment.textarea.status.default};
  border-style: solid;
  border-bottom-width: ${({ theme }) => (
    theme.forms.comment.textarea.borderBottomWidth
  )};
  height: 40px;
  padding: 5px;
  resize: none;
  transition: border ${transition.speed.superfast} linear;
  width: 100%;

  &:focus {
    border-color: ${({ theme }) => theme.forms.comment.textarea.status.focus};
    outline: none;
  }

  ${({ disabled, theme }) => disabled && `
    border-color: ${theme.forms.comment.textarea.status.disabled} !important;
    color: ${theme.forms.comment.textarea.status.disabled} !important;

    ::placeholder {
      color: ${theme.forms.comment.textarea.status.disabled} !important;
    }

    :-ms-input-placeholder {
      color: ${theme.forms.comment.textarea.status.disabled} !important;
    }

    ::-ms-input-placeholder {
      color: ${theme.forms.comment.textarea.status.disabled} !important;
    }
  `}
`;

const StyledSmileIcon = styled(Smile)`
  color: ${({ theme }) => theme.forms.comment.smileIcon.color};
  cursor: pointer;
  height: 28px;
  margin-left: 10px;
  min-height: 28px;
  min-width: 28px;
  transition: transform ${transition.speed.superfast} linear;
  width: 28px;

  &:active {
    transform: translateY(2px);
  }

  @media ${device.tablet} {
    margin: 0 15px;
  }
`;

const StyledEmojiPickerWrapper = styled.div`
  padding-top: 20px;
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
  const [emojiPickerIsVisible, setEmojiPickerIsVisible] = useState(false);

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

    (async () => {
      try {
        alertSetAction();

        const postRef = firebase.post(sid, postSlug);
        const post = await postRef.get();

        createdComment.user = {
          slug: authUser.slug,
          uid: authUser.uid,
          username: authUser.username,
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
      } finally {
        setEmojiPickerIsVisible(false);
      }
    })();
  };

  const insertEmojiIntoTextarea = (emoji) => {
    const textarea = document.getElementById(textareaId);

    textarea.focus();
    const isSuccess = document.execCommand('insertText', false, emoji);

    // Firefox
    if (!isSuccess && typeof textarea.setRangeText === 'function') {
      textarea.setRangeText(emoji);
      textarea.selectionEnd = textarea.selectionStart + emoji.length;
      textarea.selectionStart = textarea.selectionEnd;

      const event = document.createEvent('UIEvent');
      event.initEvent('input', true, false);
      textarea.dispatchEvent(event);
    }
  };

  const callbackForEmojiPicker = (emoji) => {
    insertEmojiIntoTextarea(emoji);
    setEmojiPickerIsVisible(false);
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
    >
      {({
        handleBlur,
        handleChange,
        isSubmitting,
        values,
      }) => (
        <Form>
          <StyledWrapper>
            <StyledTextareaAndSmileIconWrapper>
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

              <StyledSmileIcon
                onClick={() => (
                  !isSubmitting && setEmojiPickerIsVisible(!emojiPickerIsVisible)
                )}
              />
            </StyledTextareaAndSmileIconWrapper>

            <Button
              disabled={isSubmitting}
              size="small"
              styleType="filled"
              type="submit"
            >
              {'forms.comment.submitButton'}
            </Button>
          </StyledWrapper>

          {emojiPickerIsVisible && (
            <StyledEmojiPickerWrapper>
              <EmojiPicker callback={callbackForEmojiPicker} rounded />
            </StyledEmojiPickerWrapper>
          )}
        </Form>
      )}
    </Formik>
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
