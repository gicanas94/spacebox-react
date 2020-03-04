import { compose } from 'recompose';
import { connect } from 'react-redux';
import SecureLS from 'secure-ls';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { appLocaleSet, authUserSet } from '../Redux/actions';
import { defineAppLocale } from '../utils';
import { withFirebase } from '../Firebase';

const ls = new SecureLS();

const withAuthentication = (Component) => {
  const WithAuthentication = ({
    appLocaleSetAction,
    authUserSetAction,
    firebase,
    ...props
  }) => {
    useEffect(() => {
      const listener = firebase.onAuthUserListener(
        (authUser) => {
          ls.set('au', authUser);
          authUserSetAction(authUser);
          appLocaleSetAction(defineAppLocale(authUser.language));
        },
        () => {
          ls.remove('au');
          authUserSetAction(false);
          appLocaleSetAction(defineAppLocale());
        },
      );

      return () => listener();
    }, []);

    return <Component {...props} />;
  };

  WithAuthentication.propTypes = {
    appLocaleSetAction: PropTypes.func.isRequired,
    authUserSetAction: PropTypes.func.isRequired,
    firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  const mapDispatchToProps = {
    appLocaleSetAction: appLocaleSet,
    authUserSetAction: authUserSet,
  };

  return compose(
    connect(null, mapDispatchToProps),
    withFirebase,
  )(WithAuthentication);
};

export default withAuthentication;
