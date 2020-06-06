import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { ROUTES } from '../constants';
import { withFirebase } from '../firebase';

const withAuthorization = (condition) => (Component) => {
  const WithAuthorization = ({ authUser, firebase, ...props }) => {
    const history = useHistory();

    useEffect(() => {
      const listener = firebase.onAuthUserListener(
        () => {
          if (!condition(authUser)) {
            history.push(ROUTES.NOT_FOUND);
          }
        },
        () => history.push(ROUTES.SIGN_IN),
      );

      return () => listener();
    }, []);

    return condition(authUser) ? (
      <Component authUser={authUser} {...props} />
    ) : null;
  };

  WithAuthorization.propTypes = {
    authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
    firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  const mapStateToProps = (state) => ({ authUser: state.authUser });

  return compose(connect(mapStateToProps), withFirebase)(WithAuthorization);
};

export default withAuthorization;
