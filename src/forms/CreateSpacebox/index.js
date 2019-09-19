import * as Yup from 'yup';
import _ from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Field } from 'formik';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { alertSet } from '../../Redux/actions';
// import Button from '../../components/Button';
import { CATEGORIES, ROUTES } from '../../constants';
import Checkbox from '../../components/Checkbox';
import ColorPicker from '../../components/ColorPicker';
import { device } from '../../styles';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Spacebox from '../../components/Spacebox';
// import Tooltip from '../../components/Tooltip';
import { withFirebase } from '../../Firebase';
import Wizard from '../../components/Wizard';

const CreateSpaceboxFormSchema = [
  {},
  Yup.object().shape({
    title: Yup.string().required('This field is required!'),
    description: Yup.string().required('This field is required!'),
  }),
  Yup.object().shape({
    category: Yup.string().required('This field is required!'),
  }),
];

const StyledSpacebox = styled.div``;

const StyledP1Inputs = styled.div``;

const StyledP2n3Inputs = styled.div``;

const StyledPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 425px;

  ${StyledSpacebox} {
    margin: 0 auto;
    margin-bottom: 25px;
    width: 100%;

    & > div {
      height: 251.57px;
    }
  }

  @media ${device.tablet} {
    align-items: center;
    flex-direction: row;
    max-width: 100%;

    ${StyledSpacebox} {
      margin-bottom: 0;
      margin-right: 25px;
      width: 50%;
    }

    ${StyledP1Inputs} {
      width: 50%;
    }

    ${StyledP2n3Inputs} {
      width: 50%;
    }
  }
`;

// const mixes = [
//   {
//     bgColor: '#5c0c07',
//     color: '#fecebe',
//   },
//   {
//     bgColor: '#06385e',
//     color: '#bddeff',
//   },
// ];

class CreateSpaceboxForm extends Component {
  // handleMixerClick = (form) => {
  //   const randomMix = mixes[Math.floor(Math.random() * mixes.length)];
  //
  //   form.setFieldValue('bgColor', randomMix.bgColor);
  //   form.setFieldValue('color', randomMix.color);
  // }

  handleSubmit = (values, actions) => {
    const {
      alertSetAction,
      authUser,
      firebase,
      history,
    } = this.props;

    const {
      bgColor,
      category,
      color,
      description,
      title,
      visible,
    } = values;

    alertSetAction(null);
    actions.setSubmitting(true);

    firebase.createSpacebox({
      bgColor,
      category,
      color,
      createdAt: moment().valueOf(),
      description,
      likes: 0,
      slug: `${_.kebabCase(title)}-${Math.floor(Math.random() * 10000)}`,
      title: title.toUpperCase(),
      uid: authUser.uid,
      visible,
    })
      .then(() => {
        history.push(ROUTES.HOME);

        alertSetAction({
          text: 'Your Spacebox was successfully created. Enjoy!',
          type: 'success',
        });
      })
      .catch((error) => {
        alertSetAction({
          text: error.message,
          type: 'danger',
        });

        actions.setSubmitting(false);
      });
  };

  render() {
    return (
      <Wizard
        initialValues={{
          bgColor: 'rgb(64, 191, 163)',
          category: '',
          color: 'rgb(25, 44, 77)',
          description: 'Description',
          title: 'Title',
          visible: true,
        }}
        onSubmit={this.handleSubmit}
        validationSchema={CreateSpaceboxFormSchema}
      >
        <Wizard.Page>
          <h4>Step 1: colors</h4>

          <p>
            Background and Text color of the box. We recommend you to choose
            combination of colors with contrast that are pleasing to the eye.
          </p>

          <StyledPageWrapper>
            <StyledSpacebox>
              <Field name="spacebox">
                {({ form }) => (
                  <Spacebox
                    bgColor={form.values.bgColor}
                    category={form.values.category}
                    color={form.values.color}
                    description={form.values.description}
                    likes={0}
                    title={form.values.title}
                  />
                )}
              </Field>
            </StyledSpacebox>

            <StyledP1Inputs>
              <Field name="bgColor">
                {({ form }) => (
                  <ColorPicker
                    color={form.values.bgColor}
                    disabled={form.isSubmitting}
                    label="Background"
                    margin="0 0 25px 0"
                    name="bgColor"
                    onChangeHandler={(event) => {
                      form.setFieldValue('bgColor', event.hex);
                    }}
                  />
                )}
              </Field>

              <Field name="color">
                {({ form }) => (
                  <ColorPicker
                    color={form.values.color}
                    disabled={form.isSubmitting}
                    label="Text"
                    name="color"
                    onChangeHandler={(event) => {
                      form.setFieldValue('color', event.hex);
                    }}
                  />
                )}
              </Field>
            </StyledP1Inputs>
          </StyledPageWrapper>

          {/* <Field name="autoMix">
            {({ form }) => (
              <Button
                color="lime"
                data-for="auto-mix"
                data-tip="Generates a random combination of colors"
                fullWidth
                margin="25px 0 0 0"
                onClick={() => this.handleMixerClick(form)}
                size="large"
                styleType="filled"
                type="button"
              >
                {'Auto-Mix'}
              </Button>
            )}
          </Field>

          <Tooltip delayShow={500} effect="solid" id="auto-mix" place="bottom" /> */}
        </Wizard.Page>

        <Wizard.Page>
          <h4>Step 2: title and description</h4>

          <p>
      	    Keep in mind that if the title or description of your space is too
            long, it will not be shown completely.
          </p>

          <StyledPageWrapper>
            <StyledSpacebox>
              <Field name="spacebox">
                {({ form }) => (
                  <Spacebox
                    bgColor={form.values.bgColor}
                    category={form.values.category}
                    color={form.values.color}
                    description={form.values.description}
                    likes={0}
                    title={form.values.title}
                  />
                )}
              </Field>
            </StyledSpacebox>

            <StyledP2n3Inputs>
              <Field name="title">
                {({ field, form }) => (
                  <Input
                    autoFocus
                    disabled={form.isSubmitting}
                    error={
                      form.errors.title
                      && form.touched.title
                      && form.errors.title
                    }
                    label="Title"
                    margin="0 0 25px 0"
                    name="title"
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    rounded
                    success={!form.errors.title && form.touched.title}
                    type="text"
                    value={form.values.title}
                  />
                )}
              </Field>

              <Field name="description">
                {({ field, form }) => (
                  <Input
                    disabled={form.isSubmitting}
                    error={
                      form.errors.description
                      && form.touched.description
                      && form.errors.description
                    }
                    label="Description"
                    name="description"
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    rounded
                    success={!form.errors.description && form.touched.description}
                    type="text"
                    value={form.values.description}
                  />
                )}
              </Field>
            </StyledP2n3Inputs>
          </StyledPageWrapper>
        </Wizard.Page>

        <Wizard.Page>
          <h4>Step 3: category and visible</h4>

          <p>
          	Choose carefully the category of your Spacebox, since in case you
            decide that it is visible on the home page, other users will filter
            by category to quickly find what they want to read.
          </p>

          <StyledPageWrapper>
            <StyledSpacebox>
              <Field name="spacebox">
                {({ form }) => (
                  <Spacebox
                    bgColor={form.values.bgColor}
                    category={form.values.category}
                    color={form.values.color}
                    description={form.values.description}
                    likes={0}
                    title={form.values.title}
                  />
                )}
              </Field>
            </StyledSpacebox>

            <StyledP2n3Inputs>
              <Field name="category">
                {({ form }) => (
                  <Select
                    autoFocus
                    disabled={form.isSubmitting}
                    error={form.errors.category
                      && form.touched.category
                      && form.errors.category
                    }
                    label="Category"
                    margin="0 0 25px 0"
                    onChangeHandler={(event) => {
                      form.setFieldValue('category', event);
                      form.setFieldTouched('category');
                    }}
                    options={CATEGORIES}
                    rounded
                    success={!form.errors.category && form.touched.category}
                  />
                )}
              </Field>

              <Field name="visible">
                {({ form }) => (
                  <Checkbox
                    checked={form.values.visible}
                    disabled={form.isSubmitting}
                    label="Visible on home page"
                    name="visible"
                    onChangeHandler={() => form.setFieldValue(
                      'visible',
                      !form.values.visible,
                    )}
                    rounded
                  />
                )}
              </Field>
            </StyledP2n3Inputs>
          </StyledPageWrapper>
        </Wizard.Page>
      </Wizard>
    );
  }
}

CreateSpaceboxForm.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.objectOf(PropTypes.any).isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({ authUser: state.session.authUser });

const mapDispatchToProps = { alertSetAction: alertSet };

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase,
  withRouter,
)(CreateSpaceboxForm);
