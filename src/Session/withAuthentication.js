import { compose } from 'recompose';
import { connect } from 'react-redux';
import SecureLS from 'secure-ls';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { authUserSet } from '../Redux/actions';
import { withFirebase } from '../Firebase';

const ls = new SecureLS();

const withAuthentication = (Component) => {
  const WithAuthentication = ({ authUserSetAction, firebase, ...props }) => {
    useEffect(() => {
      const listener = firebase.onAuthUserListener(
        (authUser) => {
          ls.set('au', authUser);
          authUserSetAction(authUser);
        },
        () => {
          ls.remove('au');
          authUserSetAction(null);
        },
      );

      return () => listener();
    }, []);

    return <Component {...props} />;
  };

  WithAuthentication.propTypes = {
    authUserSetAction: PropTypes.func.isRequired,
    firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  const mapDispatchToProps = {
    authUserSetAction: authUserSet,
  };

  return compose(
    connect(null, mapDispatchToProps),
    withFirebase,
  )(WithAuthentication);
};

export default withAuthentication;
