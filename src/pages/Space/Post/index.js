import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { alertSet, loadingSet } from '../../../Redux/actions';
import { device } from '../../../styles';
import { likePost } from '../commonFunctions';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { ROUTES } from '../../../constants';
import Post from '../../../components/Post';
import SpaceboxInfoSection from '../SpaceboxInfoSection';
import { withFirebase } from '../../../Firebase';

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

class PostPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      likeInProgress: false,
      post: null,
      spacebox: null,
      user: null,
    };
  }

  componentDidMount() {
    const {
      alertSetAction,
      loadingSetAction,
      location,
      match,
    } = this.props;

    if (location.state) {
      this.setState(
        {
          spacebox: location.state.spacebox,
          user: location.state.user,
        }, () => {
          loadingSetAction(true);

          this.getPost(match.params.postSlug, location.state.spacebox.slug)
            .then(() => loadingSetAction(false))
            .catch((error) => {
              alertSetAction({
                text: error.message,
                type: 'danger',
              });

              loadingSetAction(false);
            });
        },
      );
    } else {
      this.getSpacebox(match.params.spaceboxSlug, match.params.postSlug);
    }
  }

  componentWillUnmount() {
    const { firebase } = this.props;

    (firebase.db.collection('posts').onSnapshot(() => {}));
  }

  getSpacebox = (spaceboxSlug, postSlug) => {
    const {
      alertSetAction,
      firebase,
      history,
      loadingSetAction,
    } = this.props;

    loadingSetAction(true);

    firebase.getSpacebox(spaceboxSlug).get()
      .then((document) => {
        if (document.data()) {
          this.setState(
            { spacebox: document.data() },
            () => {
              Promise.all([
                this.getUser(document.data().uid),
                this.getPost(postSlug, spaceboxSlug),
              ])
                .then(() => loadingSetAction(false))
                .catch((error) => {
                  alertSetAction({
                    text: error.message,
                    type: 'danger',
                  });

                  loadingSetAction(false);
                });
            },
          );
        } else {
          // Spacebox does not exist
          loadingSetAction(false);
          history.push(ROUTES.NOT_FOUND);
        }
      })
      .catch((error) => {
        alertSetAction({
          text: error.message,
          type: 'danger',
        });

        loadingSetAction(false);
      });
  }

  getUser = (uid) => {
    const { firebase } = this.props;

    return new Promise((resolvePromise, rejectPromise) => {
      firebase.getUser(uid).get()
        .then(document => this.setState(
          { user: document.data() },
          () => resolvePromise(),
        ))
        .catch(error => rejectPromise(error));
    });
  }

  getPost = (postSlug, spaceboxSlug) => {
    const { firebase, history, loadingSetAction } = this.props;

    return new Promise((resolvePromise, rejectPromise) => {
      try {
        firebase.getPost(postSlug, spaceboxSlug)
          .onSnapshot((document) => {
            if (document.data()) {
              this.setState(
                { post: document.data() },
                () => resolvePromise(),
              );
            } else {
              // Post does not exist
              loadingSetAction(false);
              history.push(ROUTES.NOT_FOUND);
            }
          });
      } catch (error) {
        rejectPromise(error);
      }
    });
  };

  handleLikeHeartIconClick = (likedPost) => {
    const { alertSetAction, authUser, firebase } = this.props;

    this.setState({ likeInProgress: true });

    likePost(authUser, firebase, likedPost)
      .then(() => this.setState({ likeInProgress: false }))
      .catch((error) => {
        alertSetAction({
          text: error.message,
          type: 'danger',
        });

        this.setState({ likeInProgress: false });
      });
  }

  render() {
    const { authUser, isLoading } = this.props;

    const {
      likeInProgress,
      post,
      spacebox,
      user,
    } = this.state;

    return (
      <Fragment>
        {post && <Helmet title={`${post.title} - Spacebox`} />}
        {isLoading && <LoadingSpinner />}

        {!isLoading && post && (
          <StyledGrid>
            {spacebox && user && (
              <SpaceboxInfoSection
                authUser={authUser}
                page="post"
                spacebox={spacebox}
                user={user}
              />
            )}

            <Post
              authUser={authUser}
              lastPost
              likeInProgress={likeInProgress}
              onLikeHeartIconClickHandler={
                () => this.handleLikeHeartIconClick(post)
              }
              page="post"
              post={post}
              spacebox={spacebox}
              user={user}
            />
          </StyledGrid>
        )}
      </Fragment>
    );
  }
}

PostPage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.objectOf(PropTypes.any),
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  isLoading: PropTypes.bool,
  loadingSetAction: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

PostPage.defaultProps = {
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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase,
  withRouter,
)(PostPage);
