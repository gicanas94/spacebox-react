import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import { alertSet, loadingSet } from '../../Redux/actions';
import Box from '../../components/Box';
import { device } from '../../styles';
import ListOfPosts from '../../components/ListOfPosts';
import LoadingSpinner from '../../components/LoadingSpinner';
import PostForm from '../../forms/Post';
import { withFirebase } from '../../Firebase';

const StyledGrid = styled.div`
  align-items: start;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;
  margin: auto;
  width: 100%;

  @media ${device.tablet} {
    grid-template-columns: 230px 1fr;
  }

  @media ${device.laptop} {
    grid-gap: 20px;
  }
`;

class SpacePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: null,
      postsLimit: 5,
      spacebox: null,
      spaceboxId: null,
      user: null,
    };
  }

  componentDidMount() {
    const { loadingSetAction, match } = this.props;

    loadingSetAction(true);
    this.getSpacebox(match.params.spaceboxSlug);
    window.addEventListener('scroll', this.getMorePostsIfScrollIsAtTheEnd);
  }

  componentWillUnmount() {
    const { firebase } = this.props;

    firebase.posts().off();
    window.removeEventListener('scroll', this.getMorePostsIfScrollIsAtTheEnd);
  }

  getSpacebox = (spaceboxSlug) => {
    const { alertSetAction, firebase, loadingSetAction } = this.props;

    firebase.spaceboxes()
      .orderByChild('slug')
      .equalTo(spaceboxSlug)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val()) {
          const spacebox = snapshot.val()[Object.keys(snapshot.val())[0]];
          const spaceboxId = Object.getOwnPropertyNames(snapshot.val())[0];

          this.setState(
            { spacebox, spaceboxId },
            () => {
              this.getUser(spacebox.userId);
              this.getPosts(spaceboxId);
            },
          );
        } else {
          loadingSetAction(false);
          console.log('Spacebox no existe, ir a 404');
        }
      })
      .catch(error => (
        alertSetAction({
          text: error.message,
          type: 'danger',
        })
      ));
  }

  getUser = (userId) => {
    const { alertSetAction, firebase } = this.props;

    firebase.user(userId)
      .once('value')
      .then(snapshot => this.setState({ user: snapshot.val() }))
      .catch(error => (
        alertSetAction({
          text: error.message,
          type: 'danger',
        })
      ));
  }

  getPosts = (spaceboxId) => {
    const { alertSetAction, firebase, loadingSetAction } = this.props;
    const { postsLimit } = this.state;

    try {
      firebase.posts()
        .orderByChild('spaceboxId')
        .equalTo(spaceboxId)
        .limitToLast(postsLimit)
        .on('value', snapshot => (
          this.setState(
            {
              posts: snapshot.val()
                ? Object.values(snapshot.val()).sort(
                  (a, b) => b.createdAt - a.createdAt,
                )
                : [],
            },
            () => {
              this.getMorePostsIfScrollIsAtTheEnd();
              loadingSetAction(false);
            },
          )
        ));
    } catch (error) {
      alertSetAction({
        text: error.message,
        type: 'danger',
      });

      loadingSetAction(false);
    }
  };

  getMorePostsIfScrollIsAtTheEnd = () => {
    const { spaceboxId, posts, postsLimit } = this.state;

    const windowHeight = 'innerHeight' in window
      ? window.innerHeight
      : document.documentElement.offsetHeight;

    const html = document.documentElement;

    const docHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );

    const windowBottom = Math.round(windowHeight + window.pageYOffset);

    return windowBottom >= docHeight && (
      posts.length >= postsLimit
        ? (
          this.setState(
            { postsLimit: postsLimit + 5 },
            () => this.getPosts(spaceboxId),
          )
        ) : (
          window.removeEventListener(
            'scroll',
            this.getMorePostsIfScrollIsAtTheEnd,
          )
        )
    );
  }

  render() {
    const { authUser, isLoading } = this.props;
    const { posts, spacebox, spaceboxId } = this.state;

    return (
      <Fragment>
        {spacebox && <Helmet title={`${spacebox.title} - Spacebox`} />}
        {isLoading && <LoadingSpinner />}

        {!isLoading && (
          <StyledGrid>
            <Box margin="0">
              {authUser && spacebox && authUser.uid === spacebox.userId && (
                <PostForm spaceboxId={spaceboxId} />
              )}
            </Box>

            <div>
              {posts && posts.length > 0
                ? <ListOfPosts posts={posts} spacebox={spacebox} />
                : <div>No posts.</div>
              }
            </div>
          </StyledGrid>
        )}
      </Fragment>
    );
  }
}

SpacePage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.objectOf(PropTypes.any),
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  isLoading: PropTypes.bool,
  loadingSetAction: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

SpacePage.defaultProps = {
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
)(SpacePage);
