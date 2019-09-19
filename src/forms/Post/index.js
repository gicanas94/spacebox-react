import * as Yup from 'yup';
import _ from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import { alertSet } from '../../Redux/actions';
import Box from '../../components/Box';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import { withFirebase } from '../../Firebase';

const PostFormSchema = Yup.object().shape({
  title: Yup.string().required('This field is required!'),
  content: Yup.string().required('This field is required!'),
});

const StyledBackground = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.forms.Post.bgColor};
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 400;
`;

const StyledCloserOnClick = styled.div`
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: -1;
`;

const StyledButtonsWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
`;

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = { formIsOpen: false };
  }

  componentDidMount() {
    this.closerOnClickRef = React.createRef();
  }

  handleKeydown = event => event.key === 'Escape' && this.closeForm();

  handleSubmit = (values, actions) => {
    const { alertSetAction, firebase, sid } = this.props;
    const { title, content } = values;

    alertSetAction(null);
    actions.setSubmitting(true);

    firebase.createPost(
      {
        comments: [],
        content,
        createdAt: moment().valueOf(),
        likes: [],
        sid,
        slug: `${_.kebabCase(title)}-${Math.floor(Math.random() * 10000)}`,
        title,
      },
      sid,
    )
      .then(() => {
        actions.resetForm();
        this.closeForm();
      })
      .catch(error => (
        alertSetAction({
          text: error.message,
          type: 'danger',
        })
      ));

    actions.setSubmitting(false);
  };

  openForm = () => {
    this.setState({ formIsOpen: true });
    document.addEventListener('keydown', this.handleKeydown);
  }

  closeForm = () => {
    const close = () => {
      document.removeEventListener('keydown', this.handleKeydown);
      this.setState({ formIsOpen: false });
    };

    return document.getElementById('title').value === ''
      && document.getElementById('content').value === ''
      ? close()
      : window.confirm('Are you sure you want to exit?') && close();
  }

  render() {
    const { formIsOpen } = this.state;

    return (
      <Fragment>
        <Button
          color="emerald"
          fullWidth
          onClick={() => this.openForm()}
          rounded
          size="large"
          styleType="bordered"
          type="button"
        >
          {'New post'}
        </Button>

        {formIsOpen && (
          <StyledBackground>
            <StyledCloserOnClick
              onClick={() => this.closeForm()}
              ref={this.closerOnClickRef}
            />

            <Box size="small">
              <h1>New post</h1>

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

                    <StyledButtonsWrapper>
                      <Button
                        color="abalone"
                        disabled={isSubmitting}
                        onClick={() => this.closeForm()}
                        rounded
                        styleType="unbordered"
                        type="button"
                      >
                        {'Cancel'}
                      </Button>

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
          </StyledBackground>
        )}
      </Fragment>
    );
  }
}

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
