import * as Yup from 'yup';
import _ from 'lodash';
import autosize from 'autosize';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import { alertSet } from '../../Redux/actions';
import Button from '../../components/Button';
import { transition } from '../../styles';
import { withFirebase } from '../../Firebase';

const CommentFormSchema = Yup.object().shape({
  comment: Yup.string().required(),
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

class CommentForm extends Component {
  componentDidMount() {
    autosize(document.querySelectorAll('textarea'));
  }

  componentWillUnmount() {
    autosize.destroy(document.querySelectorAll('textarea'));
  }

  handleSubmit = (values, actions) => {
    const {
      alertSetAction,
      firebase,
      postSlug,
      sid,
      uid,
    } = this.props;

    const { comment } = values;

    alertSetAction(null);
    actions.setSubmitting(true);

    firebase.createComment(
      {
        comment,
        createdAt: moment().valueOf(),
        slug: `${_.kebabCase(comment)}-${Math.floor(Math.random() * 10000)}`,
        uid,
      },
      sid,
      postSlug,
    )
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
    const { postSlug } = this.props;

    return (
      <Formik
        initialValues={{ comment: '' }}
        onSubmit={this.handleSubmit}
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
                name="comment"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Make a comment..."
                value={values.comment}
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
  }
}

CommentForm.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  postSlug: PropTypes.string.isRequired,
  sid: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
};

const mapDispatchToProps = { alertSetAction: alertSet };

export default compose(
  connect(null, mapDispatchToProps),
  withFirebase,
)(CommentForm);
