import _ from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import { alertSet, loadingSet } from '../../Redux/actions';
import Box from '../../components/Box';
import { device } from '../../styles';
import Hr from '../../components/Hr';
import ListOfPosts from '../../components/ListOfPosts';
import LoadingSpinner from '../../components/LoadingSpinner';
import { ROUTES } from '../../constants';
import Tooltip from '../../components/Tooltip';
import UserInfoSection from './UserInfoSection';
import { withFirebase } from '../../Firebase';

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

const StyledPostsHistoryYear = styled.div`
  font-size: ${props => props.theme.pages.Space.postsHistory.year.fontSize};
  font-weight: ${props => props.theme.pages.Space.postsHistory.year.fontWeight};
`;

const StyledPostsHistoryMonth = styled.div`
  font-size: ${props => props.theme.pages.Space.postsHistory.month.fontSize};
  font-weight: ${props => props.theme.pages.Space.postsHistory.month.fontWeight};
  margin-left: 7px;
  margin-top: 5px;
`;

const StyledPostsHistoryLink = styled(Link)`
  font-size: ${props => props.theme.pages.Space.postsHistory.link.fontSize};
  display: block;
  margin-left: 15px;
  margin-top: 10px;
`;

const StyledNoPostsWrapper = styled.div`
  text-align: center;
`;

class SpacePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allPosts: null,
      posts: null,
      postsHistory: null,
      postsLimit: 5,
      spacebox: null,
      spaceboxId: null,
      user: null,
    };
  }

  componentDidMount() {
    const {
      alertSetAction,
      loadingSetAction,
      match,
      location,
    } = this.props;

    loadingSetAction(true);
    window.addEventListener('scroll', this.getMorePostsIfScrollIsAtTheEnd);

    if (location.state) {
      this.setState(
        {
          spacebox: location.state.spacebox,
          spaceboxId: location.state.spacebox.myId || location.state.spaceboxId,
        },
        () => {
          Promise.all([
            this.getUser(location.state.spacebox.userId),
            this.getSomePosts(
              location.state.spacebox.myId || location.state.spaceboxId,
            ),
            this.getAllPosts(
              location.state.spacebox.myId || location.state.spaceboxId,
            ),
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
      this.getSpacebox(match.params.spaceboxSlug);
    }
  }

  componentWillUnmount() {
    const { firebase } = this.props;

    firebase.posts().off();
    window.removeEventListener('scroll', this.getMorePostsIfScrollIsAtTheEnd);
  }

  getSpacebox = (spaceboxSlug) => {
    const { alertSetAction, loadingSetAction, firebase } = this.props;

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
                this.getSomePosts(spaceboxId),
                this.getAllPosts(spaceboxId),
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
    const { firebase } = this.props;

    return new Promise((resolvePromise, rejectPromise) => {
      firebase.user(userId)
        .once('value')
        .then(snapshot => this.setState(
          { user: snapshot.val() },
          resolvePromise(),
        ))
        .catch(error => rejectPromise(error));
    });
  }

  getSomePosts = (spaceboxId) => {
    const { firebase } = this.props;
    const { postsLimit } = this.state;

    return new Promise((resolvePromise, rejectPromise) => {
      try {
        firebase.posts()
          .orderByChild('spaceboxId')
          .equalTo(spaceboxId)
          .limitToLast(postsLimit)
          .on('value', snapshot => (
            this.setState(
              {
                posts: snapshot.val()
                  ? _.orderBy(snapshot.val(), ['createdAt'], ['desc'])
                  : [],
              },
              () => {
                this.getMorePostsIfScrollIsAtTheEnd();
                resolvePromise();
              },
            )
          ));
      } catch (error) {
        rejectPromise(error);
      }
    });
  };

  getAllPosts = (spaceboxId) => {
    const { firebase } = this.props;

    return new Promise((resolvePromise, rejectPromise) => {
      try {
        firebase.posts()
          .orderByChild('spaceboxId')
          .equalTo(spaceboxId)
          .on('value', snapshot => (
            this.setState(
              { allPosts: snapshot.val() },
              () => this.composePostsHistory(resolvePromise),
            )
          ));
      } catch (error) {
        rejectPromise(error);
      }
    });
  };

  composePostsHistory = (resolveGetAllPostsPromise) => {
    const { allPosts } = this.state;
    const postsOrderedByYearAndMonth = {};

    _.map(allPosts, (post) => {
      postsOrderedByYearAndMonth[moment(post.createdAt).get('year')] = {};
    });

    _.map(allPosts, post => (
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

    _.map(allPosts, post => (
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

    this.setState(
      { postsHistory: postsOrderedByYearAndMonth },
      () => resolveGetAllPostsPromise(),
    );
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
            () => this.getSomePosts(spaceboxId),
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

    const {
      posts,
      postsHistory,
      spacebox,
      spaceboxId,
      user,
    } = this.state;

    return (
      <Fragment>
        {spacebox && <Helmet title={`${spacebox.title} - Spacebox`} />}
        {isLoading && <LoadingSpinner />}

        {!isLoading && (
          <StyledGrid>
            <div>
              {spacebox && spaceboxId && user && (
                <StyledUserInfoSection
                  authUser={authUser}
                  page="space"
                  spacebox={spacebox}
                  spaceboxId={spaceboxId}
                  user={user}
                />
              )}

              {posts && posts.length > 0 && (
                <Box margin="0" padding="15px">
                  <h2>Posts history</h2>

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
                                  post,
                                  spacebox,
                                  spaceboxId,
                                  user,
                                },
                              }}
                            >
                              <span
                                data-for={(post.createdAt + 1).toString()}
                                data-tip={moment(post.createdAt).format(
                                  'dddd, MMMM Do YYYY, h:mm',
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

            {posts && posts.length > 0
              ? (
                <ListOfPosts
                  posts={posts}
                  spacebox={spacebox}
                  spaceboxId={spaceboxId}
                  user={user}
                />
              ) : (
                <Box fullWidth margin="0">
                  <StyledNoPostsWrapper>
                    {authUser && spacebox && authUser.uid === spacebox.userId
                      ? 'You haven\'t made any post yet.'
                      : 'The writer of this Spacebox hasn\'t made any post yet.'
                    }
                  </StyledNoPostsWrapper>
                </Box>
              )
            }
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
)(SpacePage);
