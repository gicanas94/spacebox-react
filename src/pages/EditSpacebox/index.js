import _ from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import { alertSet, loadingSet } from '../../Redux/actions';
import Box from '../../components/Box';
import EditSpaceboxForm from '../../forms/EditSpacebox';
import LoadingSpinner from '../../components/LoadingSpinner';
import { ROUTES } from '../../constants';
import { withAuthorization } from '../../Session';
import { withFirebase } from '../../Firebase';

class EditSpaceboxPage extends Component {
  constructor(props) {
    super(props);

    this.state = { spacebox: null };
  }

  componentDidMount() {
    const {
      alertSetAction,
      authUser,
      firebase,
      history,
      loadingSetAction,
      match,
    } = this.props;

    loadingSetAction(true);

    firebase.getUserSpaceboxes(authUser.uid).onSnapshot((documents) => {
      const spaceboxes = [];

      documents.forEach(document => spaceboxes.push(document.data()));

      const userSpacebox = _.filter(spaceboxes, spacebox => (
        spacebox.slug === match.params.spaceboxSlug
      ))[0];

      if (userSpacebox) {
        this.setState(
          { spacebox: userSpacebox },
          () => loadingSetAction(false),
        );
      } else {
        loadingSetAction(false);
        history.push(ROUTES.HOME);
      }
    }, (error) => {
      alertSetAction({
        text: error.message,
        type: 'danger',
      });

      loadingSetAction(false);
    });
  }

  render() {
    const {
      alertSetAction,
      firebase,
      history,
      isLoading,
    } = this.props;
    const { spacebox } = this.state;

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
  }
}

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
