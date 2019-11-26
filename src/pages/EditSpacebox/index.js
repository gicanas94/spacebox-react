import { compose } from 'recompose';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Trash } from 'styled-icons/fa-solid/Trash';
import { withRouter } from 'react-router-dom';

import { alertSet, loadingSet } from '../../Redux/actions';
import Box from '../../components/Box';
import ConfirmationModal from '../../components/ConfirmationModal';
import EditSpaceboxForm from '../../forms/EditSpacebox';
import HelmetTitle from '../../components/HelmetTitle';
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
  firebase,
  history,
  isLoading,
  loadingSetAction,
  match,
}) => {
  const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);
  const [spacebox, setSpacebox] = useState(null);

  const [
    deleteSpaceboxInProgress,
    setDeleteSpaceboxInProgress,
  ] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        alertSetAction();
        loadingSetAction(true);

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
        loadingSetAction(false);
      }
    })();
  }, []);

  const handleDeleteSpaceboxClick = () => {
    (async () => {
      try {
        alertSetAction();
        setDeleteSpaceboxInProgress(true);

        await firebase.spacebox(spacebox.slug).delete();

        setConfirmationModalIsOpen(false);
        history.push(ROUTES.HOME);

        alertSetAction({
          message: {
            id: 'pages.editSpacebox.deleteSpacebox.successAlertMessage',
            values: { spaceboxTitle: spacebox.title },
          },
          type: 'success',
        });
      } catch (error) {
        setConfirmationModalIsOpen(false);
        setDeleteSpaceboxInProgress(false);

        alertSetAction({
          message: error.message,
          type: 'danger',
        });
      }
    })();
  };

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}

      {!isLoading && spacebox && (
        <Box size="medium">
          <HelmetTitle title={{ id: 'pages.editSpacebox.title' }} />

          <StyledTitleAndDeleteSpaceboxWrapper>
            <h1>
              <FormattedMessage id="pages.editSpacebox.h1" />
            </h1>

            <StyledDeleteSpacebox
              className="linkStyle"
              onClick={() => setConfirmationModalIsOpen(true)}
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

          {confirmationModalIsOpen && (
            <ConfirmationModal
              buttonsAreDisabled={deleteSpaceboxInProgress}
              content="pages.editSpacebox.deleteSpacebox.confirmationModal.content"
              onCancelHandler={() => setConfirmationModalIsOpen(false)}
              onConfirmHandler={() => handleDeleteSpaceboxClick()}
              title="pages.editSpacebox.deleteSpacebox.confirmationModal.title"
            />
          )}
        </Box>
      )}
    </Fragment>
  );
};

EditSpaceboxPage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
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
