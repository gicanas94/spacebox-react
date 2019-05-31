import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { alertSet, loadingSet } from '../../../Redux/actions';
import { device } from '../../../styles';
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
      comments: null,
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

    this.componentIsMounted = true;

    if (location.state) {
      this.setState(
        {
          spacebox: location.state.spacebox,
          user: location.state.user,
        }, () => {
          loadingSetAction(true);

          Promise.all([
            this.getPost(location.state.spacebox.slug, match.params.postSlug),
            this.getComments(location.state.spacebox.slug, match.params.postSlug),
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
      this.getSpacebox(match.params.spaceboxSlug, match.params.postSlug);
    }
  }

  componentWillUnmount() {
    const { firebase } = this.props;

    this.componentIsMounted = false;
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
                this.getPost(spaceboxSlug, postSlug),
                this.getComments(spaceboxSlug, postSlug),
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

  getPost = (spaceboxSlug, postSlug) => {
    const { firebase, history, loadingSetAction } = this.props;

    return new Promise((resolvePromise, rejectPromise) => {
      firebase.getPost(spaceboxSlug, postSlug)
        .onSnapshot((document) => {
          if (document.data()) {
            if (this.componentIsMounted) {
              this.setState(
                { post: document.data() },
                () => resolvePromise(),
              );
            }
          } else {
            // Post does not exist
            loadingSetAction(false);
            history.push(ROUTES.NOT_FOUND);
          }
        }, error => rejectPromise(error));
    });
  };

  getComments = (spaceboxSlug, postSlug) => {
    const { firebase } = this.props;

    firebase.getComments(postSlug, spaceboxSlug).orderBy('createdAt').get()
      .then((documents) => {
        const receivedComments = [];

        documents.forEach(
          document => receivedComments.push(document.data()),
        );

        this.setState({ comments: receivedComments });
      });
  }

  render() {
    const {
      alertSetAction,
      authUser,
      firebase,
      isLoading,
    } = this.props;

    const {
      comments,
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
              alertSetAction={alertSetAction}
              authUser={authUser}
              comments={comments}
              firebase={firebase}
              lastPost
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
