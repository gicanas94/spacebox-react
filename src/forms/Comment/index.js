// import * as Yup from 'yup';
import autosize from 'autosize';
// import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import Button from '../../components/Button';
import { transition } from '../../styles';

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

  render() {
    const { postSlug } = this.props;

    return (
      <StyledWrapper>
        <StyledTextarea
          id={postSlug}
          placeholder="Make a comment..."
        />

        <Button rounded size="small" styleType="bordered" type="submit">
          {'Comment'}
        </Button>
      </StyledWrapper>
    );
  }
}

CommentForm.propTypes = {
  postSlug: PropTypes.string.isRequired,
};

export default CommentForm;
