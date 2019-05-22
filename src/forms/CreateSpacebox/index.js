import * as Yup from 'yup';
import _ from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { alertSet } from '../../Redux/actions';
import Button from '../../components/Button';
import { CATEGORIES, ROUTES } from '../../constants';
import Checkbox from '../../components/Checkbox';
import ColorInput from '../../components/ColorInput';
import { device } from '../../styles';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Spacebox from '../../components/Spacebox';
import Tooltip from '../../components/Tooltip';
import { withFirebase } from '../../Firebase';
import Wizard from '../../components/Wizard';

const CreateSpaceboxFormSchema = [
  {},
  Yup.object().shape({
    title: Yup.string()
      .required('This field is required!'),
    description: Yup.string()
      .required('This field is required!'),
  }),
  Yup.object().shape({
    category: Yup.string()
      .required('This field is required!'),
  }),
];

const StyledSpacebox = styled.div`
  margin-bottom: 25px;

  @media ${device.mobileL} {
    margin-bottom: 0;
    margin-right: 25px;
    width: 50%;
  }

  @media ${device.tablet} {
    margin-bottom: 25px;
    margin-right: 0;
    width: 100%;
  }
`;

const StyledPageWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.mobileL} {
    flex-direction: row;

    ${StyledSpacebox} {
      width: 55%;
    }
  }

  @media ${device.tablet} {
    flex-direction: column;

    ${StyledSpacebox} {
      width: 100%;
    }
  }
`;

const StyledP1Inputs = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;

  @media ${device.mobileL} {
    flex-direction: column;
    width: 45%;
  }

  @media ${device.tablet} {
    flex-direction: row;
    width: 100%;
  }
`;

const StyledP2n3Inputs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${device.mobileL} {
    width: 45%;
  }

  @media ${device.tablet} {
    width: 100%;
  }
`;

const mixes = [
  {
    bgColor: '#5c0c07',
    color: '#fecebe',
  },
  {
    bgColor: '#06385e',
    color: '#bddeff',
  },
];

class CreateSpaceboxForm extends Component {
  handleMixerClick = (form) => {
    const randomMix = mixes[Math.floor(Math.random() * mixes.length)];

    form.setFieldValue('bgColor', randomMix.bgColor);
    form.setFieldValue('color', randomMix.color);
  }

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

    firebase.spaceboxes().push({
      bgColor,
      category,
      color,
      createdAt: firebase.serverValue.TIMESTAMP,
      description,
      likes: 0,
      slug: `${_.kebabCase(title)}-${_.kebabCase(authUser.uid.slice(-3))}`,
      title: title.toUpperCase(),
      userId: authUser.uid,
      visible,
    })
      .then(() => {
        firebase.user(authUser.uid).once('value', snapshot => (
          firebase.user(authUser.uid).set({
            ...snapshot.val(),
            isSpaceboxOwner: true,
          })
        ));
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
          bgColor: '#1d85a3',
          category: '',
          color: '#8cdff7',
          description: 'Description',
          title: 'Title',
          visible: true,
        }}
        onSubmit={this.handleSubmit}
        validationSchema={CreateSpaceboxFormSchema}
      >
        <Wizard.Page>
          <h3>Step 1: colors</h3>

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
                {({ field, form }) => (
                  <ColorInput
                    disabled={form.isSubmitting}
                    label="Background"
                    name="bgColor"
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    value={form.values.bgColor}
                  />
                )}
              </Field>

              <Field name="color">
                {({ field, form }) => (
                  <ColorInput
                    disabled={form.isSubmitting}
                    label="Text"
                    name="color"
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    value={form.values.color}
                  />
                )}
              </Field>
            </StyledP1Inputs>
          </StyledPageWrapper>

          <Field name="autoMix">
            {({ form }) => (
              <Button
                color="lime"
                data-for="autoMix"
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

          <Tooltip delayShow={500} effect="solid" id="autoMix" place="bottom" />
        </Wizard.Page>

        <Wizard.Page>
          <h3>Step 2: title and description</h3>

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
          <h3>Step 3: category and visible</h3>

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
                {({ field, form }) => (
                  <Select
                    autoFocus
                    disabled={form.isSubmitting}
                    error={
                      form.errors.category
                      && form.touched.category
                      && form.errors.category
                    }
                    label="Category"
                    margin="0 0 25px 0"
                    name="category"
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    options={CATEGORIES}
                    rounded
                    success={!form.errors.category && form.touched.category}
                    value={form.values.category}
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
                    onChangeHandler={() => (
                      form.setFieldValue('visible', !form.values.visible)
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
