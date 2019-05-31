import { CommentAlt } from 'styled-icons/fa-solid/CommentAlt';
import { Heart } from 'styled-icons/fa-solid/Heart';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import Box from '../Box';
import CommentForm from '../../forms/Comment';
import { device, transition } from '../../styles';
import { ROUTES } from '../../constants';
import Tooltip from '../Tooltip';

const StyledBox = styled(Box)`
  margin: 0;
  margin-bottom: 10px;
  width: 100%;

  @media ${device.laptop} {
    margin-bottom: 20px;
  }

  ${({ lastPost }) => lastPost && `
    margin-bottom: 0 !important;
  `}
`;

const StyledTitleAndDateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledContent = styled.p`
  white-space: pre-wrap;
`;

const StyledDate = styled.div`
  color: ${({ theme }) => theme.components.Post.createdAtDate.color};
  cursor: help;
  font-size: ${({ theme }) => theme.components.Post.createdAtDate.fontSize};
  font-weight: ${({ theme }) => theme.components.Post.createdAtDate.fontWeight};
  height: fit-content;
  text-align: right;
  z-index: 1;
`;

const StyledActionsWrapper = styled.div`
  user-select: none;
`;

const StyledLikeHeartIcon = styled(Heart)`
  cursor: pointer;
  margin-right: 20px;
  width: 33px;

  ${({ authUserLike, theme }) => authUserLike && `
    color: ${theme.components.Post.likeHeartIcon.likeColor};
  `}

  ${({ authUserLike, theme }) => !authUserLike && `
    color: ${theme.components.Post.likeHeartIcon.noLikeColor};
  `}

  ${({ disabled }) => !disabled && `
    &:active {
      transform: scale(0.9);
    }

    transition: transform ${transition.speed.superfast} linear;
  `}

  ${({ userIsLikingOrDisliking, theme }) => userIsLikingOrDisliking === 'like' && `
    color: ${theme.components.Post.likeHeartIcon.likeColor};
  `}

  ${({ userIsLikingOrDisliking, theme }) => userIsLikingOrDisliking === 'dislike' && `
    color: ${theme.components.Post.likeHeartIcon.noLikeColor};
  `}
`;

const StyledCommentIcon = styled(CommentAlt)`
  color: ${({ theme }) => theme.components.Post.commentIcon.disabledColor};
  cursor: pointer;
  width: 30px;

  ${({ disabled, theme }) => !disabled && `
    color: ${theme.components.Post.commentIcon.enabledColor};
    transition: transform ${transition.speed.superfast} linear;

    &:active {
      transform: scale(0.9);
    }
  `}
`;

const StyledCommentFormWrapper = styled.div`
  margin-top: 25px;
`;

class Post extends Component {
  constructor(props) {
    super(props);

    const { post } = this.props;

    this.state = {
      commentFormIsVisible: false,
      createdAt: moment(post.createdAt).fromNow(),
      likeInProgress: false,
      userIsLikingOrDisliking: null,
    };
  }

  componentDidMount() {
    this.updateCreatedAtDateInterval = setInterval(
      this.updateCreatedAtDate,
      60000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.updateCreatedAtDateInterval);
  }

  handleLikeHeartIconClick = (likedPost) => {
    const { alertSetAction, authUser, firebase } = this.props;
    const postRef = firebase.getPost(likedPost.sid, likedPost.slug);
    const spaceboxRef = firebase.getSpacebox(likedPost.sid);

    // [If like process is in progress,
    // If user is liking (false) or disliking(true)]
    this.setState(
      {
        likeInProgress: true,
        userIsLikingOrDisliking: likedPost.likes.includes(authUser.uid)
          ? 'dislike'
          : 'like',
      },
      () => (
        firebase.db.runTransaction(async (transaction) => {
          const postDocument = await transaction.get(postRef);
          const spaceboxDocument = await transaction.get(spaceboxRef);
          const post = postDocument.data();
          const spacebox = spaceboxDocument.data();
          const postAlreadyLiked = post.likes.includes(authUser.uid);

          post.likes = postAlreadyLiked
            ? post.likes.splice(post.likes.indexOf(authUser.uid), 0)
            : post.likes.concat([authUser.uid]);

          transaction.update(postRef, { likes: post.likes });

          transaction.update(spaceboxRef, {
            likes: postAlreadyLiked ? spacebox.likes - 1 : spacebox.likes + 1,
          });
        })
          .then(() => {
            this.setState({ likeInProgress: false });
          })
          .catch((error) => {
            alertSetAction({
              text: error.message,
              type: 'danger',
            });

            this.setState({ likeInProgress: false });
          })
      ),
    );
  };

  setCommentFormIsVisibleState = (state) => {
    const { post } = this.props;

    this.setState(
      { commentFormIsVisible: state },
      () => state && document.getElementById(post.slug).focus(),
    );
  };

  updateCreatedAtDate = () => {
    const { post } = this.props;

    this.setState({ createdAt: moment(post.createdAt).fromNow() });
  }

  render() {
    const {
      authUser,
      lastPost,
      page,
      post,
      spacebox,
      user,
    } = this.props;

    const {
      commentFormIsVisible,
      createdAt,
      likeInProgress,
      userIsLikingOrDisliking,
    } = this.state;

    const likeHeartIcon = (
      <StyledLikeHeartIcon
        authUserLike={
          authUser && post.likes && post.likes.includes(authUser.uid)
        }
        data-for={`like-heart-icon-${post.slug}`}
        data-tip={!authUser
          ? 'You need to be logged in to like a post'
          : 'You need to validate your e-mail to like a post'
        }
        disabled={likeInProgress || !authUser || !authUser.emailVerified}
        userIsLikingOrDisliking={userIsLikingOrDisliking}
        onClick={likeInProgress || !authUser || !authUser.emailVerified
          ? null
          : () => this.handleLikeHeartIconClick(post)
        }
      />
    );

    const commentIcon = (
      <StyledCommentIcon
        data-for={`comment-icon-${post.slug}`}
        data-tip={!authUser
          ? 'You need to be logged in to make a comment'
          : 'You need to validate your e-mail to make a comment'
        }
        disabled={!authUser || !authUser.emailVerified}
        onClick={!authUser || !authUser.emailVerified
          ? null
          : () => this.setCommentFormIsVisibleState(true)
        }
      />
    );

    return (
      <StyledBox lastPost={lastPost}>
        <StyledTitleAndDateWrapper>
          {page === 'space' && (
            <Link to={{
              pathname: `${ROUTES.SPACE_BASE}/${spacebox.slug}/${post.slug}`,
              state: {
                spacebox,
                user,
              },
            }}
            >
              <h3>{post.title}</h3>
            </Link>
          )}

          {page === 'post' && <h3>{post.title}</h3>}

          <StyledDate
            data-for={post.createdAt.toString()}
            data-tip={moment(post.createdAt).format('dddd, MMMM Do YYYY, kk:mm')}
          >
            {createdAt}
          </StyledDate>
        </StyledTitleAndDateWrapper>

        <StyledContent>
          {post.content}
        </StyledContent>

        <StyledActionsWrapper>
          {!authUser && (
            <Fragment>
              <Link to={ROUTES.SIGN_IN}>{likeHeartIcon}</Link>
              <Link to={ROUTES.SIGN_IN}>{commentIcon}</Link>
            </Fragment>
          )}

          {authUser && !authUser.emailVerified && (
            <Fragment>
              <Link to={ROUTES.VERIFY_EMAIL}>{likeHeartIcon}</Link>
              <Link to={ROUTES.VERIFY_EMAIL}>{commentIcon}</Link>
            </Fragment>
          )}

          {authUser && authUser.emailVerified && (
            <Fragment>
              {likeHeartIcon}
              {commentIcon}
            </Fragment>
          )}
        </StyledActionsWrapper>

        {authUser && authUser.emailVerified && commentFormIsVisible && (
          <StyledCommentFormWrapper>
            <CommentForm
              postSlug={post.slug}
              uid={authUser.uid}
              sid={post.sid}
            />
          </StyledCommentFormWrapper>
        )}

        <Tooltip effect="solid" id={post.createdAt.toString()} place="left" />

        {(!authUser || !authUser.emailVerified) && (
          <Fragment>
            <Tooltip
              effect="solid"
              id={`like-heart-icon-${post.slug}`}
              place="right"
            />

            <Tooltip
              effect="solid"
              id={`comment-icon-${post.slug}`}
              place="right"
            />
          </Fragment>
        )}
      </StyledBox>
    );
  }
}

Post.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.objectOf(PropTypes.any),
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  lastPost: PropTypes.bool.isRequired,
  page: PropTypes.oneOf(['space', 'post']).isRequired,
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  spacebox: PropTypes.objectOf(PropTypes.any),
  user: PropTypes.objectOf(PropTypes.any),
};

Post.defaultProps = {
  authUser: null,
  spacebox: null,
  user: null,
};

export default Post;
