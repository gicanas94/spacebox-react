import _ from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { alertSet, loadingSet } from '../../Redux/actions';
import Box from '../../components/Box';
import EditSpaceboxForm from '../../forms/EditSpacebox';
import LoadingSpinner from '../../components/LoadingSpinner';
import { ROUTES } from '../../constants';
import { withAuthorization } from '../../Session';
import { withFirebase } from '../../Firebase';

const EditSpaceboxPage = ({
  alertSetAction,
  authUser,
  firebase,
  history,
  isLoading,
  loadingSetAction,
  match,
}) => {
  const [spacebox, setSpacebox] = useState(null);

  useEffect(() => {
    const getUserSpaceboxes = async () => {
      try {
        loadingSetAction(true);

        const userSpaceboxes = [];
        const data = await firebase.getUserSpaceboxes(authUser.uid).get();

        data.forEach(document => userSpaceboxes.push(document.data()));

        const userSpaceboxToEdit = _.filter(userSpaceboxes, userSpacebox => (
          userSpacebox.slug === match.params.spaceboxSlug
        ))[0];

        if (userSpaceboxToEdit) {
          setSpacebox(userSpaceboxToEdit);
          loadingSetAction(false);
        } else {
          loadingSetAction(false);
          history.push(ROUTES.HOME);
        }
      } catch (error) {
        alertSetAction({
          text: error.message,
          type: 'danger',
        });

        loadingSetAction(false);
      }
    };

    getUserSpaceboxes();
  }, []);

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}

      {!isLoading && spacebox && (
        <Box size="medium">
          <Helmet title="Edit Spacebox - Spacebox" />
          <h1>Edit Spacebox</h1>

          <EditSpaceboxForm
            alertSetAction={alertSetAction}
            firebase={firebase}
            history={history}
            spacebox={spacebox}
          />
        </Box>
      )}
    </Fragment>
  );
};

EditSpaceboxPage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.objectOf(PropTypes.any),
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  isLoading: PropTypes.bool,
  loadingSetAction: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

EditSpaceboxPage.defaultProps = {
  authUser: null,
  isLoading: false,
};

const mapStateToProps = state => ({
  authUser: state.session.authUser,
  isLoading: state.isLoading,
});

const mapDispatchToProps = {
  alertSetAction: alertSet,
  loadingSetAction: loadingSet,
};

const condition = authUser => !!authUser;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthorization(condition),
  withFirebase,
  withRouter,
)(EditSpaceboxPage);
