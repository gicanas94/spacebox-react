import { compose } from 'recompose';
import { connect } from 'react-redux';
// import SecureLS from 'secure-ls';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { appLocaleSet, authUserSet } from '../redux/actions';
import { defineAppLocale } from '../utils';
import { withFirebase } from '../firebase';

// const ls = new SecureLS();

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
          // ls.set('au', authUser);
          appLocaleSetAction(defineAppLocale(authUser.language));
          authUserSetAction(authUser);
          localStorage.setItem('authUser', JSON.stringify(authUser));
        },
        () => {
          // ls.remove('au');
          appLocaleSetAction(defineAppLocale());
          authUserSetAction(false);
          localStorage.removeItem('authUser');
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
