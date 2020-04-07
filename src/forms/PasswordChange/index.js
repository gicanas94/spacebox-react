import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Recaptcha from 'react-recaptcha';
import { useIntl } from 'react-intl';

import Button from '../../components/Button';
import { ERRORS } from '../../constants';
import Input from '../../components/Input';
import { setCookie, getCookie } from '../../utils';

const PasswordChangeForm = ({
  alertSetAction,
  authUser,
  firebase,
}) => {
  const intl = useIntl();
  const minimumPasswordCharacters = 6;
  let recaptchaInstance;

  const PasswordChangeFormSchema = Yup.object().shape({
    password: Yup.string().trim().required('yup.required'),
    passwordOne: Yup.string()
      .trim()
      .required('yup.required')
      .min(minimumPasswordCharacters, intl.formatMessage(
        { id: 'yup.minimumCharacters' },
        { characters: minimumPasswordCharacters },
      )),
    passwordTwo: Yup.string()
      .trim()
      .required('yup.required')
      .oneOf([Yup.ref('passwordOne'), null], 'yup.passwordsMustMatch'),
    recaptcha: Yup.string().required(),
  });

  const [currentPasswordAttemps, setCurrentPasswordAttemps] = useState(0);

  const [
    reachedMaxCurrentPasswordAttemps,
    setReachedMaxCurrentPasswordAttemps,
  ] = useState(getCookie('reachedMaxCurrentPasswordAttemps', false));

  const handleSubmit = (values, actions) => {
    const { password, passwordOne } = values;

    (async () => {
      try {
        alertSetAction();

        await firebase.doSignInWithEmailAndPassword(authUser.email, password);
        await firebase.doPasswordUpdate(passwordOne);

        alertSetAction({
          message: { id: 'forms.passwordChange.successAlertMessage' },
          type: 'success',
        });

        actions.resetForm();
      } catch (error) {
        if (error.code === ERRORS.FIREBASE.WRONG_PASSWORD.CODE) {
          actions.setStatus({
            currentPasswordIsWrong: ERRORS.FIREBASE.WRONG_PASSWORD.MESSAGE,
          });

          setCurrentPasswordAttemps(currentPasswordAttemps + 1);

          if (currentPasswordAttemps === 2) {
            setCookie(
              'reachedMaxCurrentPasswordAttemps',
              '',
              new Date(new Date().getTime() + 30 * 60 * 1000).toGMTString(),
            );

            setReachedMaxCurrentPasswordAttemps(true);
            actions.resetForm();

            alertSetAction({
              message: {
                id: 'forms.passwordChange.reachedMaxCurrentPasswordAttempsAlertMessage',
              },
              type: 'danger',
            });
          }
        } else {
          alertSetAction({
            message: error.message,
            type: 'danger',
          });
        }

        Object.keys(values).map(field => actions.setFieldTouched(field, false));

        actions.setSubmitting(false);
      }
    })();
  };

  useEffect(() => {
    recaptchaInstance.execute();
  }, []);

  return (
    <Formik
      initialValues={{
        password: '',
        passwordOne: '',
        passwordTwo: '',
        recaptcha: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={PasswordChangeFormSchema}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        isSubmitting,
        setFieldValue,
        setStatus,
        status,
        touched,
        values,
      }) => (
        <Form>
          <Input
            disabled={isSubmitting || reachedMaxCurrentPasswordAttemps}
            error={
              errors.passwordOne
              && touched.passwordOne
              && errors.passwordOne
            }
            label="forms.passwordChange.labels.passwordOneInput"
            margin="0 0 25px 0"
            name="passwordOne"
            onBlur={handleBlur}
            onChange={handleChange}
            rounded
            success={!errors.passwordOne && touched.passwordOne}
            type="password"
            value={values.passwordOne}
          />

          <Input
            disabled={isSubmitting || reachedMaxCurrentPasswordAttemps}
            error={
              errors.passwordTwo
              && touched.passwordTwo
              && errors.passwordTwo
            }
            label="forms.passwordChange.labels.passwordTwoInput"
            margin="0 0 25px 0"
            name="passwordTwo"
            onBlur={handleBlur}
            onChange={handleChange}
            rounded
            success={!errors.passwordTwo && touched.passwordTwo}
            type="password"
            value={values.passwordTwo}
          />

          <Input
            disabled={isSubmitting || reachedMaxCurrentPasswordAttemps}
            error={
              (errors.password && touched.password && errors.password)
              || (status && status.currentPasswordIsWrong)
              || (status && status.reachedMaxCurrentPasswordAttemps)
            }
            label="forms.passwordChange.labels.passwordInput"
            margin="0 0 25px 0"
            name="password"
            onBlur={handleBlur}
            onChange={(e) => {
              if (status) setStatus(false);
              handleChange(e);
            }}
            rounded
            success={!errors.password && touched.password && !status}
            type="password"
            value={status ? '' : values.password}
          />

          <Button
            disabled={isSubmitting || reachedMaxCurrentPasswordAttemps}
            fullWidth
            styleType="filled"
            type="submit"
          >
            {'forms.passwordChange.submitButton'}
          </Button>

          <Recaptcha
            ref={(event) => { recaptchaInstance = event; }}
            sitekey="6LckUOIUAAAAAI_iOY8S2ibbmag3WQIN_LzNHE8d"
            size="invisible"
            verifyCallback={(response) => {
              setFieldValue('recaptcha', response);
            }}
          />
        </Form>
      )}
    </Formik>
  );
};

PasswordChangeForm.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PasswordChangeForm;
