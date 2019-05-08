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
import defaultUserImage from '../../assets/images/default-user-image.png';
import { device } from '../../styles';
import Hr from '../../components/Hr';
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
`;

const StyledImgWrapper = styled.div`
  background-color: ${props => props.theme.pages.Space.userImage.bgColor};
  border-radius: ${props => props.theme.global.borderRadius};
  height: 200px;
  margin-bottom: 25px;
  overflow: hidden;
  width: 200px;

  img {
    height: inherit;
    width: inherit;
  }
`;

const StyledPostsHistoryYear = styled.div`
  font-size: ${props => props.theme.pages.Space.postsHistory.year.fontSize};
  font-weight: ${props => props.theme.pages.Space.postsHistory.year.fontWeight};
`;

const StyledPostsHistoryMonth = styled.div`
  font-size: ${props => props.theme.pages.Space.postsHistory.month.fontSize};
  margin: 5px 0;
`;

const StyledPostsHistoryLink = styled(Link)`
  font-size: ${props => props.theme.pages.Space.postsHistory.link.fontSize};
  margin-left: 10px;
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
    const { loadingSetAction, match, location } = this.props;

    loadingSetAction(true);
    window.addEventListener('scroll', this.getMorePostsIfScrollIsAtTheEnd);

    if (location.state) {
      this.setState(
        {
          spacebox: location.state.spacebox,
          spaceboxId: location.state.spacebox.myId,
        },
        () => {
          this.getUser(location.state.spacebox.userId);
          this.getSomePosts(location.state.spacebox.myId);
          this.getAllPosts(location.state.spacebox.myId);
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
    const { alertSetAction, firebase, loadingSetAction } = this.props;

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
              this.getUser(spacebox.userId);
              this.getSomePosts(spaceboxId);
              this.getAllPosts(spaceboxId);
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

  getSomePosts = (spaceboxId) => {
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
                ? _.orderBy(snapshot.val(), ['createdAt'], ['desc'])
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

  getAllPosts = (spaceboxId) => {
    const { alertSetAction, firebase, loadingSetAction } = this.props;

    try {
      firebase.posts()
        .orderByChild('spaceboxId')
        .equalTo(spaceboxId)
        .on('value', snapshot => (
          this.setState(
            { allPosts: snapshot.val() },
            () => {
              this.composePostsHistory();
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

  composePostsHistory = () => {
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

    this.setState({ postsHistory: postsOrderedByYearAndMonth });
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
              <Box margin="0 0 10px 0" padding="15px">
                <StyledImgWrapper>
                  <img alt="User" src={defaultUserImage} />
                </StyledImgWrapper>

                {authUser && spacebox && authUser.uid === spacebox.userId && (
                  <PostForm spaceboxId={spaceboxId} />
                )}
              </Box>

              <Box margin="0" padding="15px">
                <h3>Posts history</h3>
                {_.map(_.keys(postsHistory).reverse(), year => (
                  <Fragment key={year}>
                    <StyledPostsHistoryYear>
                      {year}
                    </StyledPostsHistoryYear>

                    {_.map(_.keys(postsHistory[year]), month => (
                      <Fragment key={month}>
                        <StyledPostsHistoryMonth>
                          {moment(parseInt(month, 10) + 1, 'MM').format('MMMM')}
                        </StyledPostsHistoryMonth>

                        {_.map(postsHistory[year][month], post => (
                          <StyledPostsHistoryLink key={post.createdAt} to="/">
                            {post.title}
                          </StyledPostsHistoryLink>
                        ))}
                      </Fragment>
                    ))}

                    <Hr margin="10px 0"/>
                  </Fragment>
                ))}
              </Box>
            </div>

            <div>
              {posts && posts.length > 0
                ? <ListOfPosts posts={posts} spacebox={spacebox} user={user} />
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
