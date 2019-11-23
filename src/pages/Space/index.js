import { compose } from 'recompose';
import { connect } from 'react-redux';
import { FormattedMessage, FormattedDateParts, injectIntl } from 'react-intl';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react';

import styled from 'styled-components';

import { alertSet, loadingSet } from '../../Redux/actions';
import Box from '../../components/Box';
import { device } from '../../styles';
import HelmetTitle from '../../components/HelmetTitle';
import Hr from '../../components/Hr';
import LoadingSpinner from '../../components/LoadingSpinner';
import Post from '../../components/Post';
import PostForm from '../../forms/Post';
import { ROUTES } from '../../constants';
import SpaceboxInfoSection from '../../components/SpaceboxInfoSection';
import Tooltip from '../../components/Tooltip';
import { withFirebase } from '../../Firebase';

const StyledSpaceboxInfoSectionWrapper = styled.div``;

const StyledPostFormWrapper = styled.div``;

const StyledPostsWrapper = styled.div``;

const StyledGrid = styled.div`
  align-items: start;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;
  margin: auto;
  width: 100%;

  div {
    overflow: hidden;
  }

  ${StyledSpaceboxInfoSectionWrapper},
  ${StyledPostFormWrapper} {
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
    ${StyledPostFormWrapper} {
      margin-bottom: 20px;
    }

    ${StyledPostsWrapper} > div {
      margin-bottom: 20px;
    }
  }
`;

const StyledPostsHistoryYear = styled.div`
  font-size: ${({ theme }) => theme.pages.Space.postsHistory.year.fontSize};
  font-weight: ${({ theme }) => theme.pages.Space.postsHistory.year.fontWeight};
`;

const StyledPostsHistoryMonth = styled.div`
  font-size: ${({ theme }) => theme.pages.Space.postsHistory.month.fontSize};
  font-weight: ${({ theme }) => theme.pages.Space.postsHistory.month.fontWeight};
  margin-left: 10px;
  margin-top: 5px;
`;

const StyledPostsHistoryLink = styled(Link)`
  font-size: ${({ theme }) => theme.pages.Space.postsHistory.link.fontSize};
  display: block;
  margin-left: 20px;
  margin-top: 10px;
`;

const StyledNoPostsText = styled.p`
  margin-bottom: 0;
  text-align: center;
`;

const SpacePage = ({
  alertSetAction,
  authUser,
  firebase,
  history,
  intl,
  isLoading,
  loadingSetAction,
  location,
  match,
}) => {
  const [spacebox, setSpacebox] = useState(null);
  const [posts, _setPosts] = useState(null);
  const [postsHistory, setPostsHistory] = useState(null);
  const [postsLimit, setPostsLimit] = useState(5);
  const [user, setUser] = useState(null);
  const [allTasksFinished, setAllTasksFinished] = useState(false);
  const postsRef = useRef(posts);

  const setPosts = (newListOfPosts) => {
    postsRef.current = newListOfPosts;
    _setPosts(newListOfPosts);
  };

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

          setPosts(postsArray);
          resolve(postsArray);
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

    const docHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );

    const windowBottom = Math.round(windowHeight + window.pageYOffset);

    return windowBottom >= docHeight && (
      postsRef.current.length >= postsLimit
        ? setPostsLimit(postsLimit + 1)
        : window.removeEventListener('scroll', getMorePostsIfScrollIsAtTheEnd)
    );
  };

  const deletePostCallback = (deletedPost) => {
    const newListOfPosts = posts.filter(post => post.slug !== deletedPost.slug);

    setPosts(newListOfPosts);
    composePostsHistory(newListOfPosts);
  };

  const createPostCallback = (createdPost) => {
    const newListOfPosts = [createdPost, ...posts];

    setPosts(newListOfPosts);
    composePostsHistory(newListOfPosts);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        loadingSetAction(true);

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

        setAllTasksFinished(true);
      } catch (error) {
        alertSetAction({
          message: error.id ? error : error.message,
          type: 'danger',
        });

        if (error.id === 'pages.space.spaceboxNotFoundAlertMessage') {
          history.push(ROUTES.HOME);
        }
      } finally {
        loadingSetAction(false);
      }
    };

    getData();

    return () => {
      window.removeEventListener('scroll', getMorePostsIfScrollIsAtTheEnd);
    };
  }, []);

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}

      {allTasksFinished && (
        <Fragment>
          <HelmetTitle
            title={{
              id: 'pages.post.title',
              values: { postTitle: spacebox.title },
            }}
          />

          <StyledGrid>
            <div>
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

              {posts.length > 0 && (
                <Box
                  collapsed
                  collapseTitle="pages.space.postsHistory.boxCollapseTitle"
                  margin="0"
                  padding="15px"
                >

                  {Object.keys(postsHistory).reverse().map((year, index) => (
                    <Fragment key={year}>
                      <StyledPostsHistoryYear>
                        {year}
                      </StyledPostsHistoryYear>

                      {Object.keys(postsHistory[year]).map(month => (
                        <Fragment key={month}>
                          <StyledPostsHistoryMonth>
                            <FormattedDateParts
                              month="long"
                              value={new Date(0, month).toISOString()}
                            >
                              {parts => parts[0].value.toUpperCase()}
                            </FormattedDateParts>
                          </StyledPostsHistoryMonth>

                          {postsHistory[year][month].map(post => (
                            <StyledPostsHistoryLink
                              key={post.createdAt}
                              to={{
                                pathname: `${ROUTES.SPACE_BASE}/${spacebox.slug}/${post.slug}`,
                                state: {
                                  spacebox,
                                  user,
                                },
                              }}
                            >
                              <span
                                data-for={(post.createdAt + 1).toString()}
                                data-tip={`${intl.formatDate(
                                  post.createdAt,
                                  {
                                    day: 'numeric',
                                    month: 'long',
                                    weekday: 'long',
                                    year: 'numeric',
                                  },
                                )} - ${intl.formatTime(post.createdAt)}`}
                              >
                                {post.title}
                              </span>

                              <Tooltip
                                effect="solid"
                                delayShow={500}
                                id={(post.createdAt + 1).toString()}
                                place="right"
                              />
                            </StyledPostsHistoryLink>
                          ))}
                        </Fragment>
                      ))}

                      {Object.keys(postsHistory).length > (index + 1) && (
                        <Hr margin="10px 0" />
                      )}
                    </Fragment>
                  ))}
                </Box>
              )}
            </div>

            <div>
              {authUser && authUser.uid === spacebox.uid && (
                <StyledPostFormWrapper>
                  <PostForm
                    alertSetAction={alertSetAction}
                    createPostCallback={createPostCallback}
                    firebase={firebase}
                    sid={spacebox.slug}
                    uid={authUser.uid}
                  />
                </StyledPostFormWrapper>
              )}

              {posts.length > 0
                ? (
                  <StyledPostsWrapper>
                    {posts.slice(0, postsLimit).map(post => (
                      <Post
                        alertSetAction={alertSetAction}
                        authUser={authUser}
                        createPostCallback={createPostCallback}
                        deletePostCallback={deletePostCallback}
                        firebase={firebase}
                        key={post.createdAt}
                        page="space"
                        post={post}
                        spacebox={spacebox}
                        user={user}
                      />
                    ))}
                  </StyledPostsWrapper>
                ) : (
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
                )
              }
            </div>
          </StyledGrid>
        </Fragment>
      )}
    </Fragment>
  );
};

SpacePage.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
  isLoading: PropTypes.bool,
  loadingSetAction: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
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
  injectIntl,
  withFirebase,
  withRouter,
)(SpacePage);
