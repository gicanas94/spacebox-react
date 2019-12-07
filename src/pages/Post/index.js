import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import {
  alertSet,
  confirmationModalClose,
  confirmationModalOpen,
  isLoadingSet,
} from '../../Redux/actions';

import { device } from '../../styles';
import HelmetTitle from '../../components/HelmetTitle';
import { ROUTES } from '../../constants';
import Post from '../../components/Post';
import SpaceboxInfoSection from '../../components/SpaceboxInfoSection';
import { withFirebase } from '../../Firebase';

const StyledGrid = styled.div`
  align-items: start;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;
  margin: auto;
  width: 100%;

  @media ${device.tablet} {
    grid-template-columns: 270px 1fr;
  }

  @media ${device.laptop} {
    grid-gap: 20px;
  }
`;

const StyledPostsWrapper = styled.div`
  > div:last-child {
    margin-bottom: 0 !important;
  }
`;

const PostPage = ({
  alertSetAction,
  authUser,
  confirmationModalCloseAction,
  confirmationModalOpenAction,
  firebase,
  history,
  isLoadingSetAction,
  location,
  match,
}) => {
  const [spacebox, setSpacebox] = useState(null);
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [allTasksFinished, setAllTasksFinished] = useState(false);

  const getSpacebox = spaceboxSlug => (
    new Promise((resolve, reject) => {
      firebase.spacebox(spaceboxSlug).get()
        .then((document) => {
          if (document.data()) {
            setSpacebox(document.data());
            resolve(document.data());
          } else {
            /* eslint-disable */
            reject({ id: 'pages.post.spaceboxNotFoundAlertMessage' });
            /* eslint-enable */
          }
        })
        .catch(error => reject(error));
    })
  );

  const getPost = (spaceboxSlug, postSlug) => (
    new Promise((resolve, reject) => {
      firebase.post(spaceboxSlug, postSlug).get()
        .then((document) => {
          if (document.data()) {
            setPost(document.data());
            resolve(document.data());
          } else {
            /* eslint-disable */
            reject({ id: 'pages.post.postNotFoundAlertMessage' });
            /* eslint-enable */
          }
        })
        .catch(error => reject(error));
    })
  );

  const getUser = uid => (
    new Promise((resolve, reject) => {
      firebase.user(uid).get()
        .then((document) => {
          setUser(document.data());
          resolve(document.data());
        })
        .catch(error => reject(error));
    })
  );

  useEffect(() => {
    (async () => {
      let spaceboxData = {};

      try {
        isLoadingSetAction(true);

        if (location.state) {
          setSpacebox(location.state.spacebox);
          setUser(location.state.user);
          spaceboxData = location.state.spacebox;
        } else {
          spaceboxData = await getSpacebox(match.params.spaceboxSlug);
          await getUser(spaceboxData.uid);
        }

        await getPost(match.params.spaceboxSlug, match.params.postSlug);

        setAllTasksFinished(true);
      } catch (error) {
        alertSetAction({
          message: error.id ? error : error.message,
          type: 'danger',
        });

        if (error.id === 'pages.post.spaceboxNotFoundAlertMessage') {
          history.push(ROUTES.HOME);
        } else if (error.id === 'pages.post.postNotFoundAlertMessage') {
          history.push(
            `${ROUTES.SPACE_BASE}/${spaceboxData.slug}`,
            { spacebox: spaceboxData },
          );
        }
      } finally {
        isLoadingSetAction(false);
      }
    })();
  }, []);

  return (
    <Fragment>
      {allTasksFinished && (
        <Fragment>
          <HelmetTitle
            title={{
              id: 'pages.post.title',
              values: { postTitle: post.title },
            }}
          />

          <StyledGrid>
            <SpaceboxInfoSection
              authUserIsTheOwner={authUser && authUser.uid === spacebox.uid}
              history={history}
              location={location}
              page="post"
              spacebox={spacebox}
              user={user}
            />

            <StyledPostsWrapper>
              <Post
                alertSetAction={alertSetAction}
                authUser={authUser}
                confirmationModalCloseAction={confirmationModalCloseAction}
                confirmationModalOpenAction={confirmationModalOpenAction}
                firebase={firebase}
                history={history}
                page="post"
                post={post}
                spacebox={spacebox}
                user={user}
              />
            </StyledPostsWrapper>
          </StyledGrid>
        </Fragment>
      )}
    </Fragment>
  );
};

PostPage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
  confirmationModalCloseAction: PropTypes.func.isRequired,
  confirmationModalOpenAction: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  isLoadingSetAction: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({ authUser: state.authUser });

const mapDispatchToProps = {
  alertSetAction: alertSet,
  confirmationModalCloseAction: confirmationModalClose,
  confirmationModalOpenAction: confirmationModalOpen,
  isLoadingSetAction: isLoadingSet,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase,
  withRouter,
)(PostPage);
