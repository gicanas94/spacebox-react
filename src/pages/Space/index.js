import { compose } from 'recompose';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react';

import styled from 'styled-components';
import { Transition } from 'react-spring/renderprops';

import {
  alertSet,
  confirmationModalClose,
  confirmationModalOpen,
  isLoadingSet,
} from '../../Redux/actions';

import Box from '../../components/Box';
import { device } from '../../styles';
import HelmetTitle from '../../components/HelmetTitle';
import Post from '../../components/Post';
import PostForm from '../../forms/Post';
import PostsHistory from '../../components/PostsHistory';
import { ROUTES } from '../../constants';
import SpaceboxInfoSection from '../../components/SpaceboxInfoSection';
import { withFirebase } from '../../Firebase';

const StyledSpaceboxInfoSectionWrapper = styled.div``;
const StyledPostsHistoryWrapper = styled.div``;
const StyledPostFormWrapper = styled.div``;
const StyledJustCreatedPostsWrapper = styled.div``;
const StyledPostOfLocationPathnameWrapper = styled.div``;
const StyledSelectedPostWrapper = styled.div``;
const StyledPostsWrapper = styled.div``;

const StyledGrid = styled.div`
  align-items: start;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;
  margin: auto;
  width: 100%;

  ${StyledSpaceboxInfoSectionWrapper},
  ${StyledPostFormWrapper},
  ${StyledJustCreatedPostsWrapper},
  ${StyledPostOfLocationPathnameWrapper},
  ${StyledSelectedPostWrapper} {
    margin-bottom: 10px;
  }

  ${StyledPostsWrapper} > div {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media ${device.tablet} {
    grid-template-columns: 270px 1fr;
  }

  @media ${device.laptop} {
    grid-gap: 20px;

    ${StyledSpaceboxInfoSectionWrapper},
    ${StyledPostFormWrapper},
    ${StyledJustCreatedPostsWrapper},
    ${StyledPostOfLocationPathnameWrapper},
    ${StyledSelectedPostWrapper} {
      margin-bottom: 20px;
    }

    ${StyledPostsWrapper} > div {
      margin-bottom: 20px;
    }
  }
`;

const StyledNoPostsText = styled.p`
  margin-bottom: 0;
  text-align: center;
`;

const SpacePage = ({
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
  // ----- Declarations --------------------------------------------------------
  const [spacebox, setSpacebox] = useState(null);
  const [posts, _setPosts] = useState(null);
  const [postsHistory, setPostsHistory] = useState(null);
  const [postsLimit, _setPostsLimit] = useState(5);
  const [user, setUser] = useState(null);
  const [allTasksFinished, setAllTasksFinished] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [justCreatedPosts, setJustCreatedPosts] = useState([]);
  const [postOfLocationPathname, setPostOfLocationPathname] = useState(null);

  const postsRef = useRef(posts);
  const postsLimitRef = useRef(postsLimit);

  const setPosts = (newListOfPosts) => {
    postsRef.current = newListOfPosts;
    _setPosts(newListOfPosts);
  };

  const setPostsLimit = (newPostsLimit) => {
    postsLimitRef.current = newPostsLimit;
    _setPostsLimit(newPostsLimit);
  };

  // ----- Sync functions ------------------------------------------------------

  const composePostsHistory = (postsData) => {
    const reversedPosts = [...postsData].reverse();
    const postsHistoryObj = {};

    reversedPosts.forEach((post) => {
      Object.defineProperty(
        postsHistoryObj,
        new Date(post.createdAt).getFullYear(),
        {
          value: {},
          configurable: true,
          enumerable: true,
        },
      );
    });

    reversedPosts.forEach((post) => {
      Object.defineProperty(
        postsHistoryObj[new Date(post.createdAt).getFullYear()],
        new Date(post.createdAt).getMonth(),
        {
          value: [],
          configurable: true,
          enumerable: true,
        },
      );
    });

    reversedPosts.map(post => (
      Object.keys(postsHistoryObj).reverse().map(year => (
        new Date(post.createdAt).getFullYear() === parseInt(year, 10) && (
          Object.keys(postsHistoryObj[year]).map(month => (
            new Date(post.createdAt).getMonth() === parseInt(month, 10) && (
              postsHistoryObj[year][month].push(post)
            )
          ))
        )
      ))
    ));

    setPostsHistory(postsHistoryObj);

    return new Promise(resolve => resolve());
  };

  const getMorePostsIfScrollIsAtTheEnd = () => {
    const windowHeight = 'innerHeight' in window
      ? window.innerHeight
      : document.documentElement.offsetHeight;

    const html = document.documentElement;

    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );

    const windowBottom = Math.round(windowHeight + window.pageYOffset);

    return (windowBottom >= documentHeight) && (
      postsRef.current.length === postsLimitRef.current
        ? setPostsLimit(postsLimitRef.current + 1)
        : () => {
          window.removeEventListener('scroll', getMorePostsIfScrollIsAtTheEnd);
        }
    );
  };

  // ----- Async functions -----------------------------------------------------

  const getSpacebox = spaceboxSlug => (
    new Promise((resolve, reject) => {
      firebase.spacebox(spaceboxSlug).get()
        .then((document) => {
          if (document.data()) {
            setSpacebox(document.data());
            resolve(document.data());
          } else {
            /* eslint-disable */
            reject({ id: 'pages.space.spaceboxNotFoundAlertMessage' });
            /* eslint-enable */
          }
        })
        .catch(error => reject(error));
    })
  );

  const getPosts = spaceboxSlug => (
    new Promise((resolve, reject) => {
      firebase.spaceboxPosts(spaceboxSlug).orderBy('createdAt', 'desc').get()
        .then((documents) => {
          const postsArray = [];

          documents.forEach(document => postsArray.push(document.data()));

          if (selectedPost) {
            const postsArrayWithoutSelectedPost = postsArray.filter(post => (
              post.slug === selectedPost.slug
            ));

            setPosts(postsArrayWithoutSelectedPost);
            resolve(postsArrayWithoutSelectedPost);
          } else {
            setPosts(postsArray);
            resolve(postsArray);
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

  const getPostOfLocationPathname = (spaceboxSlug, postSlug) => (
    new Promise((resolve, reject) => {
      firebase.post(spaceboxSlug, postSlug).get()
        .then((document) => {
          if (document.data()) {
            setPostOfLocationPathname(document.data());
            resolve(document.data());
          } else {
            history.push(`${ROUTES.SPACE_BASE}/${spaceboxSlug}`);
            /* eslint-disable */
            reject({ id: 'pages.space.postNotFoundAlertMessage' });
            /* eslint-enable */
          }

          setAllTasksFinished(true);
        })
        .catch(error => reject(error));
    })
  );

  const deletePostCallback = (deletedPost) => {
    if (selectedPost && selectedPost.slug === deletedPost.slug) {
      setSelectedPost(null);
      history.push(`${ROUTES.SPACE_BASE}/${spacebox.slug}`);
    }

    if (postOfLocationPathname && postOfLocationPathname.slug === deletedPost.slug) {
      setPostOfLocationPathname(null);
      history.push(`${ROUTES.SPACE_BASE}/${spacebox.slug}`);
    }

    if (justCreatedPosts.indexOf(deletedPost) !== -1) {
      const newListOfPosts = justCreatedPosts.filter(
        post => post.slug !== deletedPost.slug,
      );

      setJustCreatedPosts(newListOfPosts);
      composePostsHistory([...newListOfPosts, ...posts]);
    } else {
      const newListOfPosts = posts.filter(
        post => post.slug !== deletedPost.slug,
      );

      setPosts(newListOfPosts);
      composePostsHistory(newListOfPosts);
    }
  };

  const newPostCallback = (createdPost) => {
    const newListOfJustCreatedPosts = [createdPost, ...justCreatedPosts];

    setJustCreatedPosts(newListOfJustCreatedPosts);
    composePostsHistory([...newListOfJustCreatedPosts, ...posts]);
  };

  const selectPostCallback = (post) => {
    if ((selectedPost && selectedPost.slug === post.slug)) {
      return;
    }

    history.push(`${ROUTES.SPACE_BASE}/${spacebox.slug}/${post.slug}`);
    setPostOfLocationPathname();
    setSelectedPost(post);
  };

  useEffect(() => {
    (async () => {
      try {
        isLoadingSetAction(true);

        let spaceboxData = {};

        if (location.state) {
          setSpacebox(location.state.spacebox);
          spaceboxData = location.state.spacebox;
        } else {
          spaceboxData = await getSpacebox(match.params.spaceboxSlug);
        }

        const postsData = await getPosts(match.params.spaceboxSlug);
        await composePostsHistory(postsData);
        await getUser(spaceboxData.uid);

        if (postsData.length > postsLimit) {
          window.addEventListener('scroll', getMorePostsIfScrollIsAtTheEnd);
        }

        if (match.params.postSlug) {
          await getPostOfLocationPathname(
            spaceboxData.slug,
            match.params.postSlug,
          );
        } else {
          setAllTasksFinished(true);
        }
      } catch (error) {
        alertSetAction({
          message: error.id ? error : error.message,
          type: 'danger',
        });

        if (error.id === 'pages.space.spaceboxNotFoundAlertMessage') {
          history.push(ROUTES.HOME);
        }
      } finally {
        isLoadingSetAction(false);
      }
    })();

    return () => {
      window.removeEventListener('scroll', getMorePostsIfScrollIsAtTheEnd);
    };
  }, []);

  return (
    <Fragment>
      {allTasksFinished && (
        <Fragment>
          {/* Page title */}
          <HelmetTitle
            title={{
              id: 'pages.space.title',
              values: {
                title: selectedPost ? selectedPost.title : spacebox.title,
              },
            }}
          />

          <StyledGrid>
            <div>
              {/* Spacebox Info Section */}
              {spacebox && user && (
                <StyledSpaceboxInfoSectionWrapper>
                  <SpaceboxInfoSection
                    authUserIsTheOwner={
                      authUser && authUser.uid === spacebox.uid
                    }
                    history={history}
                    location={location}
                    page="space"
                    spacebox={spacebox}
                    user={user}
                  />
                </StyledSpaceboxInfoSectionWrapper>
              )}

              {/* Posts History */}
              {posts.length > 0 && (
                <StyledPostsHistoryWrapper>
                  <PostsHistory
                    history={postsHistory}
                    spaceboxSlug={spacebox.slug}
                  />
                </StyledPostsHistoryWrapper>
              )}
            </div>

            <div>
              {/* New post form */}
              {authUser && authUser.uid === spacebox.uid && (
                <StyledPostFormWrapper>
                  <Box padding="20px">
                    <h2>
                      <FormattedMessage id="pages.space.postForm.h2" />
                    </h2>

                    <PostForm
                      alertSetAction={alertSetAction}
                      firebase={firebase}
                      newPostCallback={newPostCallback}
                      sid={spacebox.slug}
                      uid={authUser.uid}
                    />
                  </Box>
                </StyledPostFormWrapper>
              )}

              {/* Just created posts */}
              {justCreatedPosts.length > 0 && justCreatedPosts.map(justCreatedPost => (
                <Transition
                  items={justCreatedPost}
                  from={{ transform: 'scale(0.1)' }}
                  enter={{ transform: 'scale(1)' }}
                  leave={{ opacity: '0' }}
                  config={{ mass: 1, tension: 600, friction: 42 }}
                  key={justCreatedPost.createdAt}
                >
                  {post => post && (transitionProps => (
                    <StyledJustCreatedPostsWrapper style={transitionProps}>
                      <Post
                        alertSetAction={alertSetAction}
                        authUser={authUser}
                        confirmationModalCloseAction={confirmationModalCloseAction}
                        confirmationModalOpenAction={confirmationModalOpenAction}
                        deletePostCallback={deletePostCallback}
                        firebase={firebase}
                        post={justCreatedPost}
                        selected={selectedPost && selectedPost.slug === post.slug}
                        selectPostCallback={selectPostCallback}
                        spacebox={spacebox}
                        user={user}
                      />
                    </StyledJustCreatedPostsWrapper>
                  ))}
                </Transition>
              ))}

              {/* Post of location pathname */}
              {postOfLocationPathname && (
                <Transition
                  items={postOfLocationPathname}
                  from={{ transform: 'scale(0.1)' }}
                  enter={{ transform: 'scale(1)' }}
                  leave={{ opacity: '0' }}
                  config={{ mass: 1, tension: 600, friction: 42 }}
                >
                  {post => post && (transitionProps => (
                    <StyledPostOfLocationPathnameWrapper
                      key={postOfLocationPathname.createdAt}
                      style={transitionProps}
                    >
                      <Post
                        alertSetAction={alertSetAction}
                        authUser={authUser}
                        confirmationModalCloseAction={confirmationModalCloseAction}
                        confirmationModalOpenAction={confirmationModalOpenAction}
                        deletePostCallback={deletePostCallback}
                        firebase={firebase}
                        post={postOfLocationPathname}
                        selected
                        spacebox={spacebox}
                        user={user}
                      />
                    </StyledPostOfLocationPathnameWrapper>
                  ))}
                </Transition>
              )}

              {/* All posts except just created */}
              {posts.length > 0 && (
                <StyledPostsWrapper>
                  {posts.slice(0, postsLimit).map(post => (
                    <Post
                      alertSetAction={alertSetAction}
                      authUser={authUser}
                      confirmationModalCloseAction={confirmationModalCloseAction}
                      confirmationModalOpenAction={confirmationModalOpenAction}
                      deletePostCallback={deletePostCallback}
                      firebase={firebase}
                      key={post.createdAt}
                      post={post}
                      selected={selectedPost && selectedPost.slug === post.slug}
                      selectPostCallback={selectPostCallback}
                      spacebox={spacebox}
                      user={user}
                    />
                  ))}
                </StyledPostsWrapper>
              )}

              {/* No posts message */}
              {posts.length === 0 && (
                <Box fullWidth margin="0">
                  <StyledNoPostsText>
                    <FormattedMessage
                      id={
                        authUser && authUser.uid === spacebox.uid
                          ? 'pages.space.noPostsText.authUserIsTheOwner'
                          : 'pages.space.noPostsText.authUserIsNotTheOwner'
                      }
                    />
                  </StyledNoPostsText>
                </Box>
              )}
            </div>
          </StyledGrid>
        </Fragment>
      )}
    </Fragment>
  );
};

SpacePage.propTypes = {
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
)(SpacePage);
