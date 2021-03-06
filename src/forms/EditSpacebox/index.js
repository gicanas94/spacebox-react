import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Button';
import { CATEGORIES, ROUTES } from '../../constants';
import Checkbox from '../../components/Checkbox';
import ColorPicker from '../../components/ColorPicker';
import { devices } from '../../styles';
import Hr from '../../components/Hr';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Spacebox from '../../components/Spacebox';

const StyledSpacebox = styled.div`
  margin: auto;
  max-width: 425px;
  width: 100%;
`;

const StyledWrapper = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 25px;

  ${StyledSpacebox} {
    & > div {
      height: 252.71px;
    }
  }

  @media ${devices.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;

  button {
    width: 100%;
  }

  button:last-of-type {
    margin-bottom: 25px;
  }

  @media ${devices.mobileL} {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    button {
      width: fit-content;
    }

    button:last-of-type {
      margin-bottom: 0;
    }
  }

  @media ${devices.tablet} {
    justify-content: space-between;
  }
`;

const EditSpaceboxForm = ({ alertSetAction, firebase, spacebox }) => {
  const history = useHistory();

  const EditSpaceboxFormSchema = Yup.object().shape({
    title: Yup.string().trim().required('yup.required'),
    description: Yup.string().trim().required('yup.required'),
    category: Yup.string()
      .trim()
      .oneOf(
        CATEGORIES.map((category) => category.messageId),
        'yup.required',
      )
      .required('yup.required'),
  });

  const handleSubmit = (values, actions) => {
    const updatedSpacebox = {
      bgColor: values.bgColor,
      category: values.category,
      color: values.color,
      description: values.description,
      title: values.title,
      updatedAt: new Date().toISOString(),
      visible: values.visible,
    };

    (async () => {
      try {
        alertSetAction();

        await firebase.spacebox(spacebox.slug).update(updatedSpacebox);

        alertSetAction({
          message: { id: 'forms.editSpacebox.successAlertMessage' },
          type: 'success',
        });

        history.push(`${ROUTES.SPACE_BASE}/${spacebox.slug}`, {
          spacebox: { ...spacebox, ...updatedSpacebox },
        });
      } catch (error) {
        alertSetAction({
          message: error.message,
          type: 'danger',
        });

        Object.keys(values).map((field) =>
          actions.setFieldTouched(field, false),
        );

        actions.setSubmitting(false);
      }
    })();
  };

  return (
    <Formik
      initialValues={spacebox}
      onSubmit={handleSubmit}
      validationSchema={EditSpaceboxFormSchema}
    >
      {({
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
                likes={values.likes}
                title={values.title}
              />
            </StyledSpacebox>

            <div>
              <ColorPicker
                color={values.bgColor}
                disabled={isSubmitting}
                label="forms.editSpacebox.labels.backgroundColorPicker"
                margin="0 0 25px 0"
                name="bgColor"
                onChangeHandler={(event) => {
                  setFieldValue('bgColor', event.hex);
                }}
              />

              <ColorPicker
                color={values.color}
                disabled={isSubmitting}
                label="forms.editSpacebox.labels.textColorPicker"
                name="color"
                onChangeHandler={(event) => {
                  setFieldValue('color', event.hex);
                }}
              />
            </div>

            <Input
              disabled={isSubmitting}
              error={errors.title && touched.title && errors.title}
              label="forms.editSpacebox.labels.titleInput"
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
                errors.description && touched.description && errors.description
              }
              label="forms.editSpacebox.labels.descriptionInput"
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
              label="forms.editSpacebox.labels.categorySelect"
              onChangeHandler={(category) => {
                setFieldValue('category', category);
                setFieldTouched('category');
              }}
              options={CATEGORIES}
              rounded
              success={!errors.category && touched.category}
              value={values.category}
            />

            <Checkbox
              checked={values.visible}
              disabled={isSubmitting}
              label="forms.editSpacebox.labels.visibleCheckbox"
              name="visible"
              onChangeHandler={() => setFieldValue('visible', !values.visible)}
              rounded
            />
          </StyledWrapper>

          <Hr margin="25px 0" />

          <StyledButtonsWrapper>
            <Button
              color="abalone"
              onClick={() => history.goBack()}
              styleType="unbordered"
              type="button"
            >
              forms.editSpacebox.cancelButton
            </Button>

            <Button disabled={isSubmitting} styleType="bordered" type="submit">
              forms.editSpacebox.submitButton
            </Button>
          </StyledButtonsWrapper>
        </Form>
      )}
    </Formik>
  );
};

EditSpaceboxForm.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  spacebox: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EditSpaceboxForm;
