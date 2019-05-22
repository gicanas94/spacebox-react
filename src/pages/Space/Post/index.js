import _ from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import { alertSet, loadingSet } from '../../../Redux/actions';
import { device } from '../../../styles';
import { likePost } from '../commonFunctions';
import Post from '../../../components/Post';
import LoadingSpinner from '../../../components/LoadingSpinner';
import UserInfoSection from '../UserInfoSection';
import { withFirebase } from '../../../Firebase';

const StyledUserInfoSection = styled(UserInfoSection)``;

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

    ${StyledUserInfoSection} {
      margin-bottom: 20px;
    }
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
    const { location, match } = this.props;

    if (location.state) {
      this.setState({
        post: location.state.post,
        spacebox: location.state.spacebox,
        spaceboxId: location.state.spaceboxId,
        user: location.state.user,
      });
    } else {
      this.getSpacebox(match.params.spaceboxSlug);
    }
  }

  getSpacebox = (spaceboxSlug) => {
    const { alertSetAction, firebase, loadingSetAction } = this.props;

    loadingSetAction(true);

    firebase.spaceboxes()
      .orderByChild('slug')
      .equalTo(spaceboxSlug)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val()) {
          const spaceboxId = _.keys(snapshot.val())[0];
          const spacebox = snapshot.val()[spaceboxId];

          this.setState(
            { spacebox, spaceboxId },
            () => {
              Promise.all([
                this.getUser(spacebox.userId),
                this.getPost(spaceboxId),
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
          loadingSetAction(false);
          console.log('Spacebox no existe, ir a 404');
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

  getUser = (userId) => {
    const { firebase } = this.props;

    return new Promise((resolvePromise, rejectPromise) => {
      firebase.user(userId)
        .once('value')
        .then(snapshot => this.setState(
          { user: snapshot.val() },
          () => resolvePromise(),
        ))
        .catch(error => rejectPromise(error));
    });
  }

  getPost = (spaceboxId) => {
    const { firebase, loadingSetAction, match } = this.props;

    return new Promise((resolvePromise, rejectPromise) => {
      try {
        firebase.posts()
          .orderByChild('spaceboxId')
          .equalTo(spaceboxId)
          .on('value', (snapshot) => {
            if (snapshot.val()) {
              const filteredPost = _.filter(
                snapshot.val(),
                post => post.slug === match.params.postSlug,
              )[0];

              if (filteredPost) {
                this.setState(
                  { post: filteredPost },
                  () => resolvePromise(),
                );
              } else {
                loadingSetAction(false);
                console.log('Post no existe, ir a 404');
              }
            } else {
              loadingSetAction(false);
              console.log('El Spacebox no tiene posts, ir a 404');
            }
          });
      } catch (error) {
        rejectPromise(error);
      }
    });
  };

  handleLikeClick = (likedPost) => {
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
      spaceboxId,
      user,
    } = this.state;

    return (
      <Fragment>
        {post && <Helmet title={`${post.title} - Spacebox`} />}
        {isLoading && <LoadingSpinner />}

        {!isLoading && post && (
          <StyledGrid>
            {spacebox && spaceboxId && user && (
              <StyledUserInfoSection
                authUser={authUser}
                page="post"
                spacebox={spacebox}
                spaceboxId={spaceboxId}
                user={user}
              />
            )}

            <Post
              authUser={authUser}
              likeInProgress={likeInProgress}
              onLikeClickHandler={() => this.handleLikeClick(post)}
              post={post}
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
)(PostPage);
