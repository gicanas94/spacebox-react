import { compose } from 'recompose';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Trash } from 'styled-icons/fa-solid';
import { withRouter } from 'react-router-dom';

import { alertSet, confirmationModalOpen, isLoadingSet } from '../../Redux/actions';
import Box from '../../components/Box';
import EditSpaceboxForm from '../../forms/EditSpacebox';
import HelmetTitle from '../../components/HelmetTitle';
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
    theme.pages.editSpacebox.deleteSpacebox.color
  )} !important;
  font-size: ${({ theme }) => (
    theme.pages.editSpacebox.deleteSpacebox.fontSize
  )} !important;
  font-weight: ${({ theme }) => (
    theme.pages.editSpacebox.deleteSpacebox.fontWeight
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
  confirmationModalOpenAction,
  firebase,
  history,
  isLoading,
  isLoadingSetAction,
  match,
}) => {
  const [spacebox, setSpacebox] = useState(null);

  const [
    deleteSpaceboxInProgress,
    setDeleteSpaceboxInProgress,
  ] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        alertSetAction();
        isLoadingSetAction(true);

        const userSpaceboxes = [];
        const data = await firebase.userSpaceboxes(authUser.uid).get();

        data.forEach(document => userSpaceboxes.push(document.data()));

        const userSpaceboxToEdit = userSpaceboxes.filter(userSpacebox => (
          userSpacebox.slug === match.params.spaceboxSlug
        ))[0];

        if (userSpaceboxToEdit) {
          setSpacebox(userSpaceboxToEdit);
        } else {
          history.push(ROUTES.HOME);
        }
      } catch (error) {
        alertSetAction({
          message: error.message,
          type: 'danger',
        });

        history.push(ROUTES.HOME);
      } finally {
        isLoadingSetAction(false);
      }
    })();
  }, []);

  const handleDeleteSpaceboxClick = () => (
    new Promise((resolve, reject) => (
      (async () => {
        try {
          alertSetAction();
          setDeleteSpaceboxInProgress(true);

          await firebase.spacebox(spacebox.slug).delete();

          resolve();
          history.push(ROUTES.HOME);

          alertSetAction({
            message: {
              id: 'pages.editSpacebox.deleteSpacebox.successAlertMessage',
              values: { spaceboxTitle: spacebox.title },
            },
            type: 'success',
          });
        } catch (error) {
          reject();
          setDeleteSpaceboxInProgress(false);

          alertSetAction({
            message: error.message,
            type: 'danger',
          });
        }
      })()
    ))
  );

  return (
    <Fragment>
      {!isLoading && spacebox && (
        <Box size="medium">
          <HelmetTitle title={{ id: 'pages.editSpacebox.title' }} />

          <StyledTitleAndDeleteSpaceboxWrapper>
            <h1>
              <FormattedMessage id="pages.editSpacebox.h1" />
            </h1>

            <StyledDeleteSpacebox
              className="linkStyle"
              onClick={() => confirmationModalOpenAction({
                buttonsAreDisabled: deleteSpaceboxInProgress,
                content: 'pages.editSpacebox.deleteSpacebox.confirmationModal.content',
                onConfirmHandler: handleDeleteSpaceboxClick,
                title: 'pages.editSpacebox.deleteSpacebox.confirmationModal.title',
              })}
              tabIndex="0"
            >
              <StyledTrashIcon />

              <FormattedMessage
                id="pages.editSpacebox.deleteSpacebox.triggerElementText"
              />
            </StyledDeleteSpacebox>
          </StyledTitleAndDeleteSpaceboxWrapper>

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
  authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
  confirmationModalOpenAction: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoadingSetAction: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
  authUser: state.authUser,
  isLoading: state.isLoading,
});

const mapDispatchToProps = {
  alertSetAction: alertSet,
  isLoadingSetAction: isLoadingSet,
  confirmationModalOpenAction: confirmationModalOpen,
};

const condition = authUser => !!authUser;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthorization(condition),
  withFirebase,
  withRouter,
)(EditSpaceboxPage);
