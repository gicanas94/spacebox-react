import * as Yup from 'yup';
import _ from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { alertSet } from '../../redux/actions';
import { CATEGORIES, ROUTES } from '../../constants';
import Checkbox from '../../components/Checkbox';
import ColorPicker from '../../components/ColorPicker';
import { device } from '../../styles';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Spacebox from '../../components/Spacebox';
import { withFirebase } from '../../firebase';
import Textarea from '../../components/Textarea';
import Wizard from '../../components/Wizard';

const StyledH2 = styled.h2`
  margin-bottom: 5px;
`;

const StyledSpacebox = styled.div``;

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
      height: 252.71px;
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

    & > div:last-of-type {
      width: 50%;
    }
  }
`;

const CreateSpaceboxForm = ({ alertSetAction, authUser, firebase }) => {
  const history = useHistory();
  const intl = useIntl();

  const CreateSpaceboxFormSchema = [
    Yup.object().shape({}),
    Yup.object().shape({
      title: Yup.string().trim().required('yup.required'),
      description: Yup.string().required('yup.required'),
    }),
    Yup.object().shape({
      category: Yup.string()
        .trim()
        .oneOf(
          CATEGORIES.map((category) => category.messageId),
          'yup.required',
        )
        .required('yup.required'),
    }),
  ];

  const handleSubmit = (values, actions) => {
    const createdSpacebox = {
      bgColor: values.bgColor,
      category: values.category,
      color: values.color,
      createdAt: new Date().toISOString(),
      description: values.description.trim(),
      likes: 0,
      slug: `${_.kebabCase(values.title)}-${Math.floor(Math.random() * 10000)}`,
      title: values.title.trim(),
      uid: authUser.uid,
      visible: values.visible,
    };

    (async () => {
      try {
        alertSetAction();

        await firebase.spacebox(createdSpacebox.slug).set(createdSpacebox);

        alertSetAction({
          message: { id: 'forms.createSpacebox.successAlertMessage' },
          type: 'success',
        });

        history.push(`${ROUTES.SPACE_BASE}/${createdSpacebox.slug}`, {
          spacebox: createdSpacebox,
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
    <Wizard
      initialValues={{
        bgColor: 'rgb(64, 191, 163)',
        category: '',
        color: 'rgb(25, 44, 77)',
        description: intl.formatMessage({
          id: 'forms.createSpacebox.defaultDescriptionValue',
        }),
        title: intl.formatMessage({
          id: 'forms.createSpacebox.defaultTitleValue',
        }),
        visible: true,
      }}
      onSubmit={handleSubmit}
      validationSchema={CreateSpaceboxFormSchema}
    >
      <Wizard.Page>
        <StyledH2>
          {intl.formatMessage({ id: 'forms.createSpacebox.step1.h2' })}
        </StyledH2>

        <p>{intl.formatMessage({ id: 'forms.createSpacebox.step1.p' })}</p>

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

          <div>
            <Field name="bgColor">
              {({ form }) => (
                <ColorPicker
                  color={form.values.bgColor}
                  disabled={form.isSubmitting}
                  label="forms.createSpacebox.labels.backgroundColorPicker"
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
                  label="forms.createSpacebox.labels.textColorPicker"
                  name="color"
                  onChangeHandler={(event) => {
                    form.setFieldValue('color', event.hex);
                  }}
                />
              )}
            </Field>
          </div>
        </StyledPageWrapper>
      </Wizard.Page>

      <Wizard.Page>
        <StyledH2>
          {intl.formatMessage({ id: 'forms.createSpacebox.step2.h2' })}
        </StyledH2>

        <p>{intl.formatMessage({ id: 'forms.createSpacebox.step2.p' })}</p>

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

          <div>
            <Field name="title">
              {({ field, form }) => (
                <Input
                  disabled={form.isSubmitting}
                  error={
                    form.errors.title && form.touched.title && form.errors.title
                  }
                  label="forms.createSpacebox.labels.titleInput"
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
                <Textarea
                  disabled={form.isSubmitting}
                  error={
                    form.errors.description &&
                    form.touched.description &&
                    form.errors.description
                  }
                  label="forms.createSpacebox.labels.descriptionInput"
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
          </div>
        </StyledPageWrapper>
      </Wizard.Page>

      <Wizard.Page>
        <StyledH2>
          {intl.formatMessage({ id: 'forms.createSpacebox.step3.h2' })}
        </StyledH2>

        <p>{intl.formatMessage({ id: 'forms.createSpacebox.step3.p' })}</p>

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

          <div>
            <Field name="category">
              {({ form }) => (
                <Select
                  disabled={form.isSubmitting}
                  error={
                    form.errors.category &&
                    form.touched.category &&
                    form.errors.category
                  }
                  label="forms.createSpacebox.labels.categorySelect"
                  margin="0 0 25px 0"
                  onChangeHandler={(category) => {
                    form.setFieldValue('category', category);
                    form.setFieldTouched('category');
                  }}
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
                  label="forms.createSpacebox.labels.visibleCheckbox"
                  name="visible"
                  onChangeHandler={() =>
                    form.setFieldValue('visible', !form.values.visible)
                  }
                  rounded
                />
              )}
            </Field>
          </div>
        </StyledPageWrapper>
      </Wizard.Page>
    </Wizard>
  );
};

CreateSpaceboxForm.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = { alertSetAction: alertSet };

export default compose(
  connect(null, mapDispatchToProps),
  withFirebase,
)(CreateSpaceboxForm);
