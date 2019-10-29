import _ from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import { alertSet, loadingSet } from '../../Redux/actions';
import Box from '../../components/Box';
import { device } from '../../styles';
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

class SpacePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: null,
      postsHistory: null,
      postsLimit: 5,
      spacebox: null,
      user: null,
    };
  }

  componentDidMount() {
    const { loadingSetAction, match, location } = this.props;

    this.componentIsMounted = true;
    loadingSetAction(true);

    if (location.state) {
      this.setState(
        { spacebox: location.state.spacebox },
        () => this.getUserAndPosts(),
      );
    } else {
      this.getSpacebox(match.params.spaceboxSlug);
    }
  }

  componentWillUnmount() {
    const { firebase } = this.props;

    this.componentIsMounted = false;
    (firebase.db.collection('posts').onSnapshot(() => {}));
    (firebase.db.collection('comments').onSnapshot(() => {}));
    window.removeEventListener('scroll', this.getMorePostsIfScrollIsAtTheEnd);
  }

  getSpacebox = (spaceboxSlug) => {
    const {
      alertSetAction,
      firebase,
      history,
      loadingSetAction,
    } = this.props;

    firebase.getSpacebox(spaceboxSlug).get()
      .then((document) => {
        if (document.data()) {
          this.setState(
            { spacebox: document.data() },
            () => this.getUserAndPosts(),
          );
        } else {
          // Spacebox does not exist
          loadingSetAction(false);
          history.push(ROUTES.NOT_FOUND);
        }
      })
      .catch(error => (
        alertSetAction({
          text: error.message,
          type: 'danger',
        })
      ));
  }

  getUserAndPosts = () => {
    const { alertSetAction, loadingSetAction } = this.props;
    const { spacebox } = this.state;

    Promise.all([
      this.getUser(spacebox.uid),
      this.getPosts(spacebox.slug),
    ])
      .then(() => {
        window.addEventListener('scroll', this.getMorePostsIfScrollIsAtTheEnd);
        loadingSetAction(false);
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

  getPosts = (spaceboxSlug) => {
    const { firebase } = this.props;

    return new Promise((resolvePromise, rejectPromise) => {
      firebase.getSpaceboxPosts(spaceboxSlug)
        .orderBy('createdAt', 'desc')
        .onSnapshot((documents) => {
          const posts = [];

          documents.forEach(document => posts.push(document.data()));

          if (this.componentIsMounted) {
            this.setState(
              { posts },
              () => this.composePostsHistory(resolvePromise),
            );
          }
        }, error => rejectPromise(error));
    });
  };

  composePostsHistory = (resolveGetPostsPromise) => {
    const { posts } = this.state;
    const postsOrderedByYearAndMonth = {};
    const reversedPosts = [...posts].reverse();

    _.map(reversedPosts, (post) => {
      postsOrderedByYearAndMonth[moment(post.createdAt).get('year')] = {};
    });

    _.map(reversedPosts, post => (
      _.map(postsOrderedByYearAndMonth, (yearValue, yearKey) => (
        moment(post.createdAt).get('year').toString() === yearKey && (
          Object.defineProperty(
            yearValue,
            moment(post.createdAt).get('month'),
            {
              value: [],
              configurable: true,
              enumerable: true,
            },
          )
        )
      ))
    ));

    _.map(reversedPosts, post => (
      _.map(postsOrderedByYearAndMonth, (yearValue, yearKey) => {
        if (moment(post.createdAt).get('year').toString() === yearKey) {
          _.map(yearValue, (monthValue, monthKey) => {
            if (moment(post.createdAt).get('month').toString() === monthKey) {
              monthValue.push(post);
            }
          });
        }
      })
    ));

    this.setState({ postsHistory: postsOrderedByYearAndMonth });
    resolveGetPostsPromise();
  };

  getMorePostsIfScrollIsAtTheEnd = () => {
    const { posts, postsLimit } = this.state;

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
          this.setState({ postsLimit: postsLimit + 1 })
        ) : (
          window.removeEventListener(
            'scroll',
            this.getMorePostsIfScrollIsAtTheEnd,
          )
        )
    );
  }

  render() {
    const {
      alertSetAction,
      authUser,
      firebase,
      history,
      location,
      isLoading,
    } = this.props;

    const {
      posts,
      postsHistory,
      postsLimit,
      spacebox,
      user,
    } = this.state;

    return (
      <Fragment>
        {spacebox && <Helmet title={`${spacebox.title} - Spacebox`} />}
        {isLoading && <LoadingSpinner />}

        {!isLoading && (
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

              {posts && posts.length > 0 && (
                <Box
                  collapsed
                  collapseTitle={<h3>Posts history</h3>}
                  margin="0"
                  padding="15px"
                >
                  <h3>Posts history</h3>

                  {_.map(_.keys(postsHistory).reverse(), (year, index) => (
                    <Fragment key={year}>
                      <StyledPostsHistoryYear>
                        {year}
                      </StyledPostsHistoryYear>

                      {_.map(_.keys(postsHistory[year]), month => (
                        <Fragment key={month}>
                          <StyledPostsHistoryMonth>
                            {moment(
                              parseInt(month, 10) + 1, 'MM',
                            ).format('MMMM')}
                          </StyledPostsHistoryMonth>

                          {_.map(postsHistory[year][month], post => (
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
                                data-tip={moment(post.createdAt).format(
                                  'dddd, MMMM Do YYYY, kk:mm',
                                )}
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
              {authUser && spacebox && authUser.uid === spacebox.uid && (
                <StyledPostFormWrapper>
                  <PostForm
                    alertSetAction={alertSetAction}
                    firebase={firebase}
                    sid={spacebox.slug}
                  />
                </StyledPostFormWrapper>
              )}

              {posts && posts.length > 0
                ? (
                  <StyledPostsWrapper>
                    {posts.slice(0, postsLimit).map(post => (
                      <Post
                        alertSetAction={alertSetAction}
                        authUser={authUser}
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
                      {authUser && spacebox && authUser.uid === spacebox.uid
                        ? 'You haven\'t made any post yet.'
                        : 'The writer of this Spacebox hasn\'t made any post yet.'
                      }
                    </StyledNoPostsText>
                  </Box>
                )
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
  history: PropTypes.objectOf(PropTypes.any).isRequired,
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
  withFirebase,
  withRouter,
)(SpacePage);
