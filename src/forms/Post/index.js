import * as Yup from 'yup';
import _ from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Cross } from 'styled-icons/icomoon/Cross';
import { Form, Formik } from 'formik';
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
  title: Yup.string()
    .required('This field is required!'),
  content: Yup.string()
    .required('This field is required!'),
});

const StyledBackround = styled.div`
  align-items: center;
  background-color: ${props => props.theme.forms.Post.bgColor};
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 400;
`;

const StyledCrossIcon = styled(Cross)`
  cursor: pointer;
  position: absolute;
  right: 25px;
  top: 25px;
  width: 25px;
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
    this.backgroundRef = React.createRef();
  }

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
      .then(() => {
        actions.resetForm();
        this.toggleFormIsOpenState(false);
      })
      .catch(error => (
        alertSetAction({
          text: error.message,
          type: 'danger',
        })
      ));

    actions.setSubmitting(false);
  };

  toggleFormIsOpenState = state => this.setState({ formIsOpen: state });

  render() {
    const { formIsOpen } = this.state;

    return (
      <Fragment>
        <Button
          fullWidth
          onClick={() => this.toggleFormIsOpenState(true)}
          rounded
          styleType="filled"
        >
          {'New post'}
        </Button>

        {formIsOpen && (
          <StyledBackround>
            <Box size="small">
              <h2>New post</h2>

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
                        color="lava"
                        disabled={isSubmitting}
                        onClick={() => this.toggleFormIsOpenState(false)}
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

            <StyledCrossIcon />
          </StyledBackround>
        )}
      </Fragment>
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
