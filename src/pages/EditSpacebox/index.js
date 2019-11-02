import _ from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Trash } from 'styled-icons/fa-solid/Trash';
import { withRouter } from 'react-router-dom';

import { alertSet, loadingSet } from '../../Redux/actions';
import Box from '../../components/Box';
import ConfirmationModal from '../../components/ConfirmationModal';
import EditSpaceboxForm from '../../forms/EditSpacebox';
import LoadingSpinner from '../../components/LoadingSpinner';
import { ROUTES } from '../../constants';
import { withAuthorization } from '../../Session';
import { withFirebase } from '../../Firebase';

const StyledTitleAndDeleteSpaceboxWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;

  h1 {
    margin-bottom: 0;
  }
`;

const StyledDeleteSpacebox = styled.span`
  color: ${({ theme }) => (
    theme.pages.EditSpacebox.deleteSpacebox.color
  )} !important;
  font-size: ${({ theme }) => (
    theme.pages.EditSpacebox.deleteSpacebox.fontSize
  )} !important;
  font-weight: ${({ theme }) => (
    theme.pages.EditSpacebox.deleteSpacebox.fontWeight
  )} !important;
  text-align: right;
`;

const StyledTrashIcon = styled(Trash)`
  margin-right: 5px;
  width: 14px;
`;

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
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);

  const [
    deleteSpaceboxInProgress,
    setDeleteSpaceboxInProgress,
  ] = useState(false);

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

  const handleDeleteSpaceboxClick = () => {
    alertSetAction();
    setDeleteSpaceboxInProgress(true);

    firebase.deleteSpacebox(spacebox.slug)
      .then(() => {
        setConfirmModalIsOpen(false);
        history.push(ROUTES.HOME);

        alertSetAction({
          text: `Your Spacebox ${spacebox.title} has been deleted.`,
          type: 'success',
        });
      })
      .catch((error) => {
        setConfirmModalIsOpen(false);
        setDeleteSpaceboxInProgress(false);

        alertSetAction({
          text: error.message,
          type: 'danger',
        });
      });
  };

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}

      {!isLoading && spacebox && (
        <Box size="medium">
          <Helmet title="Edit Spacebox - Spacebox" />

          <StyledTitleAndDeleteSpaceboxWrapper>
            <h1>Edit Spacebox</h1>

            <StyledDeleteSpacebox
              className="linkStyle"
              onClick={() => setConfirmModalIsOpen(true)}
              tabIndex="0"
            >
              <StyledTrashIcon />
              {'delete Spacebox'}
            </StyledDeleteSpacebox>
          </StyledTitleAndDeleteSpaceboxWrapper>

          <EditSpaceboxForm
            alertSetAction={alertSetAction}
            firebase={firebase}
            history={history}
            spacebox={spacebox}
          />

          {confirmModalIsOpen && (
            <ConfirmationModal
              buttonsAreDisabled={deleteSpaceboxInProgress}
              content="Are you 100% sure about this?"
              onCancelHandler={() => setConfirmModalIsOpen(false)}
              onConfirmHandler={() => handleDeleteSpaceboxClick()}
              title="Delete Spacebox"
            />
          )}
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
