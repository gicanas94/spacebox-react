import { compose } from 'recompose';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Trash } from 'styled-icons/fa-solid';
import { useHistory, useParams } from 'react-router-dom';

import {
  alertSet,
  confirmationModalOpen,
  isLoadingSet,
} from '../../redux/actions';
import Box from '../../components/Box';
import EditSpaceboxForm from '../../forms/EditSpacebox';
import HelmetTitle from '../../components/HelmetTitle';
import { ROUTES } from '../../constants';
import { withAuthorization } from '../../session';
import { withFirebase } from '../../firebase';

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
  color: ${({ theme }) =>
    theme.pages.editSpacebox.deleteSpacebox.color} !important;
  font-size: ${({ theme }) =>
    theme.pages.editSpacebox.deleteSpacebox.fontSize} !important;
  font-weight: ${({ theme }) =>
    theme.pages.editSpacebox.deleteSpacebox.fontWeight} !important;
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
  isLoading,
  isLoadingSetAction,
}) => {
  const [spacebox, setSpacebox] = useState(null);

  const [deleteSpaceboxInProgress, setDeleteSpaceboxInProgress] = useState(
    false,
  );

  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    (async () => {
      try {
        alertSetAction();
        isLoadingSetAction(true);

        const userSpaceboxes = [];
        const data = await firebase.userSpaceboxes(authUser.uid).get();

        data.forEach((document) => userSpaceboxes.push(document.data()));

        const userSpaceboxToEdit = userSpaceboxes.filter(
          (userSpacebox) => userSpacebox.slug === params.spaceboxSlug,
        )[0];

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

  const handleDeleteSpaceboxClick = () =>
    new Promise((resolve, reject) =>
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
      })(),
    );

  return (
    <>
      {!isLoading && spacebox && (
        <Box size="medium">
          <HelmetTitle title={{ id: 'pages.editSpacebox.title' }} />

          <StyledTitleAndDeleteSpaceboxWrapper>
            <h1>
              <FormattedMessage id="pages.editSpacebox.h1" />
            </h1>

            <StyledDeleteSpacebox
              className="linkStyle"
              onClick={() =>
                confirmationModalOpenAction({
                  buttonsAreDisabled: deleteSpaceboxInProgress,
                  content:
                    'pages.editSpacebox.deleteSpacebox.confirmationModal.content',
                  onConfirmHandler: handleDeleteSpaceboxClick,
                  title:
                    'pages.editSpacebox.deleteSpacebox.confirmationModal.title',
                })
              }
              tabIndex="0"
            >
              <StyledTrashIcon />

              <FormattedMessage id="pages.editSpacebox.deleteSpacebox.triggerElementText" />
            </StyledDeleteSpacebox>
          </StyledTitleAndDeleteSpaceboxWrapper>

          <EditSpaceboxForm
            alertSetAction={alertSetAction}
            firebase={firebase}
            spacebox={spacebox}
          />
        </Box>
      )}
    </>
  );
};

EditSpaceboxPage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
  confirmationModalOpenAction: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoadingSetAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
});

const mapDispatchToProps = {
  alertSetAction: alertSet,
  isLoadingSetAction: isLoadingSet,
  confirmationModalOpenAction: confirmationModalOpen,
};

const condition = (authUser) => !!authUser;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthorization(condition),
  withFirebase,
)(EditSpaceboxPage);
