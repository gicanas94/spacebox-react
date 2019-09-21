import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import Button from '../../components/Button';
import { CATEGORIES, ROUTES } from '../../constants';
import Checkbox from '../../components/Checkbox';
import ColorPicker from '../../components/ColorPicker';
import { device } from '../../styles';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Spacebox from '../../components/Spacebox';

const EditSpaceboxFormSchema = [
  Yup.object().shape({
    title: Yup.string().required('This field is required!'),
    description: Yup.string().required('This field is required!'),
  }),
];

const StyledSpacebox = styled.div`
  margin: auto;
  max-width: 425px;
  width: 100%;
`;

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 25px;

  ${StyledSpacebox} {
    & > div {
      height: 252.71px;
    }
  }

  @media ${device.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StyledCheckBoxAndButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

class EditSpaceboxForm extends Component {
  handleSubmit = (values, actions) => {
    const {
      alertSetAction,
      firebase,
      history,
      spacebox,
    } = this.props;

    const updatedSpacebox = {
      bgColor: values.bgColor,
      category: values.category,
      color: values.color,
      description: values.description,
      title: values.title,
      updatedAt: moment().valueOf(),
      visible: values.visible,
    };

    alertSetAction(null);

    firebase.updateSpacebox(spacebox.slug, updatedSpacebox)
      .then(() => {
        alertSetAction({
          text: 'Your Spacebox was successfully updated.',
          type: 'success',
        });

        history.push(
          `${ROUTES.SPACE_BASE}/${spacebox.slug}`,
          {
            spacebox: { ...spacebox, ...updatedSpacebox },
          },
        );
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
    const { spacebox } = this.props;

    return (
      <Formik
        initialValues={spacebox}
        onSubmit={this.handleSubmit}
        validationSchema={EditSpaceboxFormSchema}
        render={({
          errors,
          handleBlur,
          handleChange,
          isSubmitting,
          setFieldTouched,
          setFieldValue,
          touched,
          values,
        }) => (
          <Form>
            <StyledWrapper>
              <StyledSpacebox>
                <Spacebox
                  bgColor={values.bgColor}
                  category={values.category}
                  color={values.color}
                  description={values.description}
                  likes={0}
                  title={values.title}
                />
              </StyledSpacebox>

              <div>
                <ColorPicker
                  color={values.bgColor}
                  disabled={isSubmitting}
                  label="Background"
                  margin="0 0 25px 0"
                  name="bgColor"
                  onChangeHandler={(event) => {
                    setFieldValue('bgColor', event.hex);
                  }}
                />

                <ColorPicker
                  color={values.color}
                  disabled={isSubmitting}
                  label="Text"
                  name="color"
                  onChangeHandler={(event) => {
                    setFieldValue('color', event.hex);
                  }}
                />
              </div>

              <Input
                disabled={isSubmitting}
                error={errors.title && touched.title && errors.title}
                label="Title"
                name="title"
                onBlur={handleBlur}
                onChange={handleChange}
                rounded
                success={!errors.title && touched.title}
                type="text"
                value={values.title}
              />

              <Input
                disabled={isSubmitting}
                error={
                  errors.description
                  && touched.description
                  && errors.description
                }
                label="Description"
                name="description"
                onBlur={handleBlur}
                onChange={handleChange}
                rounded
                success={!errors.description && touched.description}
                type="text"
                value={values.description}
              />

              <Select
                disabled={isSubmitting}
                error={errors.category && touched.category && errors.category}
                label="Category"
                onChangeHandler={(event) => {
                  setFieldValue('category', event);
                  setFieldTouched('category');
                }}
                options={CATEGORIES}
                rounded
                success={!errors.category && touched.category}
                value={values.category}
              />

              <StyledCheckBoxAndButtonWrapper>
                <Checkbox
                  checked={values.visible}
                  disabled={isSubmitting}
                  label="Visible on home page"
                  name="visible"
                  onChangeHandler={() => setFieldValue(
                    'visible',
                    !values.visible,
                  )}
                  rounded
                />

                <Button
                  disabled={isSubmitting}
                  rounded
                  styleType="bordered"
                  type="submit"
                >
                  {'Save'}
                </Button>
              </StyledCheckBoxAndButtonWrapper>
            </StyledWrapper>
          </Form>
        )}
      />
    );
  }
}

EditSpaceboxForm.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  spacebox: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EditSpaceboxForm;
