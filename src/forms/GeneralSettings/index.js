import _ from 'lodash';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { LANGUAGES } from '../../constants';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import UserProfileImage from '../../components/UserProfileImage';

const StyledWrapper = styled.div`
  button {
    width: 100%;
  }
`;

const StyledUserProfileImageWrapper = styled.div`
  margin: 0 auto 25px auto;
  max-width: 300px;
  width: 100%;
`;

const GeneralSettingsForm = ({
  alertSetAction,
  authUser,
  firebase,
  isLoadingSetAction,
}) => {
  const intl = useIntl();
  const minimumUsernameCharacters = 4;
  const maximumUsernameCharacters = 25;

  const GeneralSettingsFormSchema = Yup.object().shape({
    username: Yup.string()
      .trim()
      .min(minimumUsernameCharacters, intl.formatMessage(
        { id: 'yup.minimumCharacters' },
        { characters: minimumUsernameCharacters },
      ))
      .max(maximumUsernameCharacters, intl.formatMessage(
        { id: 'yup.maximumCharacters' },
        { characters: maximumUsernameCharacters },
      ))
      .required('yup.required'),
    email: Yup.string()
      .trim()
      .email('yup.emailInvalid')
      .required('yup.required'),
    language: Yup
      .string()
      .trim()
      .oneOf(_.map(LANGUAGES, (category) => category.messageId), 'yup.required')
      .required('yup.required'),
  });

  const handleSubmit = (values, actions) => {
    (async () => {
      try {
        alertSetAction();

        await firebase.user(authUser.uid).update({
          bio: values.bio && values.bio.trim() ? values.bio.trim() : null,
          language: values.language.substr(
            values.language.length - 2,
            values.language.length,
          ),
          username: values.username,
        });

        alertSetAction({
          message: { id: 'forms.generalSettings.successAlertMessage' },
          type: 'success',
        });

        actions.resetForm();
      } catch (error) {
        alertSetAction({
          message: error.message,
          type: 'danger',
        });

        Object.keys(values).map((field) => actions.setFieldTouched(field, false));

        actions.setSubmitting(false);
      } finally {
        isLoadingSetAction(false);
      }
    })();
  };

  return (
    <Formik
      initialValues={{
        username: authUser.username,
        email: authUser.email,
        bio: authUser.bio || '',
        language: LANGUAGES.filter(
          (language) => language.messageId.includes(`.${authUser.language}`),
        )[0].messageId,
      }}
      onSubmit={handleSubmit}
      validationSchema={GeneralSettingsFormSchema}
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
            <StyledUserProfileImageWrapper>
              <UserProfileImage
                alertSetAction={alertSetAction}
                authUser={authUser}
                firebase={firebase}
                isLoadingSetAction={isLoadingSetAction}
                rounded
              />
            </StyledUserProfileImageWrapper>

            <Input
              disabled={isSubmitting}
              error={errors.username && touched.username && errors.username}
              label="forms.generalSettings.labels.usernameInput"
              margin="0 0 25px 0"
              name="username"
              onBlur={handleBlur}
              onChange={handleChange}
              rounded
              success={!errors.username && touched.username}
              type="text"
              value={values.username}
            />

            <Input
              disabled
              error={errors.email && touched.email && errors.email}
              label="forms.generalSettings.labels.emailInput"
              margin="0 0 25px 0"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              rounded
              success={!errors.email && touched.email}
              type="text"
              value={values.email}
            />

            <Select
              disabled={isSubmitting}
              error={errors.language && touched.language && errors.language}
              label="forms.generalSettings.labels.languageSelect"
              margin="0 0 25px 0"
              onChangeHandler={(language) => {
                setFieldValue('language', language);
                setFieldTouched('language');
              }}
              options={LANGUAGES}
              rounded
              success={!errors.language && touched.language}
              value={values.language}
            />

            <Textarea
              disabled={isSubmitting}
              error={errors.bio && touched.bio && errors.bio}
              label="forms.generalSettings.labels.bioTextarea"
              margin="0 0 25px 0"
              name="bio"
              onBlur={handleBlur}
              onChange={handleChange}
              rounded
              success={!errors.bio && touched.bio}
              type="text"
              value={values.bio}
            />

            <Button disabled={isSubmitting} styleType="filled" type="submit">
              forms.generalSettings.submitButton
            </Button>
          </StyledWrapper>
        </Form>
      )}
    </Formik>
  );
};

GeneralSettingsForm.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  isLoadingSetAction: PropTypes.func.isRequired,
};

export default GeneralSettingsForm;
