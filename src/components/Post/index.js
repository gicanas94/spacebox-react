import _ from 'lodash';
import { CommentAlt } from 'styled-icons/fa-solid/CommentAlt';
import { Comments } from 'styled-icons/fa-solid/Comments';
import { Heart } from 'styled-icons/fa-solid/Heart';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Trash } from 'styled-icons/fa-solid/Trash';
import useStateWithCallback from 'use-state-with-callback';

import Box from '../Box';
import Comment from './Comment';
import CommentForm from '../../forms/Comment';
import { ROUTES } from '../../constants';
import Tooltip from '../Tooltip';
import { transition } from '../../styles';

const StyledTitleAndDateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const StyledTitle = styled.h3`
  margin-bottom: 0;
`;

const StyledContent = styled.p`
  white-space: pre-wrap;
`;

const StyledCreatedAtDate = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`;

const StyledDateFromNow = styled.span`
  color: ${({ theme }) => (
    theme.components.Post.createdAtDate.dateFromNow.color
  )};
  font-size: ${({ theme }) => (
    theme.components.Post.createdAtDate.dateFromNow.fontSize
  )};
  font-weight: ${({ theme }) => (
    theme.components.Post.createdAtDate.dateFromNow.fontWeight
  )};
`;

const StyledLongDate = styled.span`
  color: ${({ theme }) => (
    theme.components.Post.createdAtDate.longDate.color
  )};
  font-size: ${({ theme }) => (
    theme.components.Post.createdAtDate.longDate.fontSize
  )};
`;

const StyledActionsAndStatsWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
`;

const StyledActions = styled.div`
  user-select: none;
`;

const StyledStats = styled.div`
  color: ${({ theme }) => theme.components.Post.stats.color};
  font-size: ${({ theme }) => theme.components.Post.stats.fontSize};
  user-select: none;
`;

const StyledLikesStatIcon = styled(Heart)`
  margin-right: 4px;
  width: 13px;
`;

const StyledCommentsStatIcon = styled(Comments)`
  margin: 0 4px;
  width: 13px;
`;

const StyledLikeHeartIcon = styled(Heart)`
  cursor: pointer;
  margin-right: 20px;
  width: 30px;

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
  color: ${({ theme }) => theme.components.Post.commentIcon.color};
  cursor: pointer;
  margin-right: 20px;
  width: 28px;

  ${({ disabled }) => !disabled && `
    transition: transform ${transition.speed.superfast} linear;

    &:active {
      transform: scale(0.9);
    }
  `}
`;

const StyledTrashIcon = styled(Trash)`
  color: ${({ theme }) => theme.components.Post.trashIcon.color};
  cursor: pointer;
  height: 30px;
  width: 28px;
  transition: transform ${transition.speed.superfast} linear;

  &:active {
    transform: scale(0.9);
  }
`;

const StyledCommentFormWrapper = styled.div`
  margin-top: 25px;
`;

const StyledCommentsWrapper = styled.div`
  margin-top: 25px;

  div:last-child {
    margin-bottom: 0;
  }
`;

const StyledSeeOrHideCommentsSpan = styled.span`
  color: ${({ theme }) => theme.components.Post.seeOrHideComments.color};
  cursor: pointer
  font-weight: ${({ theme }) => (
    theme.components.Post.seeOrHideComments.fontWeight
  )};

  &:hover {
    text-decoration: underline;
  }
`;

const Post = ({
  alertSetAction,
  authUser,
  firebase,
  page,
  post,
  spacebox,
  user,
}) => {
  const [commentsLimit, setCommentsLimit] = useState(3);
  const [createdAt, setCreatedAt] = useState(moment(post.createdAt).fromNow());
  const [likeInProgress, setLikeInProgress] = useState(false);
  const [userIsLikingOrDisliking, setUserIsLikingOrDisliking] = useState(false);
  const commentFormId = `comment-form_${post.slug}`;

  const [
    commentFormIsVisible,
    setCommentFormIsVisible,
  ] = useStateWithCallback(false, () => {
    if (commentFormIsVisible) {
      document.getElementById(commentFormId).focus();
    }
  });

  const updateCreatedAtDate = () => (
    setCreatedAt(moment(post.createdAt).fromNow())
  );

  const handleDeletePostClick = (spaceboxSlug, postSlug) => {
    alertSetAction();

    firebase.deletePost(spaceboxSlug, postSlug)
      .then(() => {
        alertSetAction({
          text: 'The post has been deleted.',
          type: 'success',
        });
      })
      .catch((error) => {
        alertSetAction({
          text: error.message,
          type: 'danger',
        });
      });
  };

  const handleLikeHeartIconClick = (likedPost) => {
    const postRef = firebase.getPost(likedPost.sid, likedPost.slug);
    const spaceboxRef = firebase.getSpacebox(likedPost.sid);

    setLikeInProgress(true);

    // [If like process is in progress,
    // If user is liking (false) or disliking(true)]
    setUserIsLikingOrDisliking(
      likedPost.likes.includes(authUser.uid)
        ? 'dislike'
        : 'like',
    );

    firebase.db.runTransaction(async (transaction) => {
      const postDocument = await transaction.get(postRef);
      const spaceboxDocument = await transaction.get(spaceboxRef);
      const postData = postDocument.data();
      const spaceboxData = spaceboxDocument.data();
      const postAlreadyLiked = post.likes.includes(authUser.uid);

      postData.likes = postAlreadyLiked
        ? postData.likes.splice(postData.likes.indexOf(authUser.uid), 0)
        : postData.likes.concat([authUser.uid]);

      transaction.update(postRef, { likes: postData.likes });

      transaction.update(spaceboxRef, {
        likes: postAlreadyLiked
          ? spaceboxData.likes - 1
          : spaceboxData.likes + 1,
      });
    })
      .then(() => setLikeInProgress(false))
      .catch((error) => {
        alertSetAction({
          text: error.message,
          type: 'danger',
        });

        setLikeInProgress(false);
      });
  };

  const handleSeeCommentsClick = () => setCommentsLimit(commentsLimit + 3);

  const handleHideCommentsClick = () => setCommentsLimit(0);

  const likeHeartIcon = (
    <StyledLikeHeartIcon
      authUserLike={
        authUser && post.likes && post.likes.includes(authUser.uid)
      }
      data-for={`like-heart-icon_${post.slug}`}
      data-tip={!authUser
        ? 'You need to be logged in to like a post'
        : 'You need to validate your e-mail to like a post'
      }
      disabled={likeInProgress || !authUser || !authUser.emailVerified}
      userIsLikingOrDisliking={userIsLikingOrDisliking}
      onClick={likeInProgress || !authUser || !authUser.emailVerified
        ? null
        : () => handleLikeHeartIconClick(post)
      }
    />
  );

  const commentIcon = (
    <StyledCommentIcon
      data-for={`comment-icon_${post.slug}`}
      data-tip={!authUser
        ? 'You need to be logged in to make a comment'
        : 'You need to validate your e-mail to make a comment'
      }
      disabled={!authUser || !authUser.emailVerified}
      onClick={!authUser || !authUser.emailVerified
        ? null
        : () => setCommentFormIsVisible(true)
      }
    />
  );

  const trashIcon = (
    <StyledTrashIcon
      data-for={`trash-icon_${post.slug}`}
      data-tip="Delete post"
      onClick={
        () => !likeInProgress && handleDeletePostClick(spacebox.slug, post.slug)
      }
    />
  );

  useEffect(() => {
    const updateCreatedAtDateInterval = setInterval(updateCreatedAtDate, 60000);

    return () => clearInterval(updateCreatedAtDateInterval);
  }, []);

  return (
    <Box padding="20px">
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
            <StyledTitle>{post.title}</StyledTitle>
          </Link>
        )}

        {page === 'post' && <StyledTitle>{post.title}</StyledTitle>}

        <StyledCreatedAtDate>
          <StyledDateFromNow>{createdAt}</StyledDateFromNow>

          <StyledLongDate>
            {moment(post.createdAt).format('DD/MM/YY - kk:mm')}
          </StyledLongDate>
        </StyledCreatedAtDate>
      </StyledTitleAndDateWrapper>

      <StyledContent>
        {post.content}
      </StyledContent>

      <StyledActionsAndStatsWrapper>
        <StyledActions>
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

          {authUser && authUser.uid === spacebox.uid && (
            <Fragment>
              {trashIcon}

              <Tooltip
                effect="solid"
                id={`trash-icon_${post.slug}`}
                place="right"
              />
            </Fragment>
          )}
        </StyledActions>

        <StyledStats>
          {post.likes.length > 0 && (
            <Fragment>
              <StyledLikesStatIcon />
              {post.likes.length}
            </Fragment>
          )}

          {post.comments.length > 0 && (
            <Fragment>
              <StyledCommentsStatIcon />
              {post.comments.length}
            </Fragment>
          )}
        </StyledStats>
      </StyledActionsAndStatsWrapper>

      {authUser && authUser.emailVerified && commentFormIsVisible && (
        <StyledCommentFormWrapper>
          <CommentForm
            postSlug={post.slug}
            sid={post.sid}
            textareaId={commentFormId}
            user={{ username: authUser.username, uid: authUser.uid }}
          />
        </StyledCommentFormWrapper>
      )}

      {post.comments && post.comments.length > 0 && (
        <StyledCommentsWrapper>
          {_.orderBy(post.comments, 'createdAt', 'desc')
            .slice(0, commentsLimit).map(comment => (
              <Comment authUser={authUser} comment={comment} key={comment.slug} />
            ))
          }

          {post.comments.length > commentsLimit && (
            <StyledSeeOrHideCommentsSpan
              onClick={() => handleSeeCommentsClick()}
            >
              {`See comments (${post.comments.length - commentsLimit})...`}
            </StyledSeeOrHideCommentsSpan>
          )}

          {commentsLimit >= post.comments.length && (
            <StyledSeeOrHideCommentsSpan
              onClick={() => handleHideCommentsClick()}
            >
              {'Hide comments...'}
            </StyledSeeOrHideCommentsSpan>
          )}
        </StyledCommentsWrapper>
      )}

      {(!authUser || !authUser.emailVerified) && (
        <Fragment>
          <Tooltip
            effect="solid"
            id={`like-heart-icon_${post.slug}`}
            place="right"
          />

          <Tooltip
            effect="solid"
            id={`comment-icon_${post.slug}`}
            place="right"
          />
        </Fragment>
      )}
    </Box>
  );
};

Post.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.objectOf(PropTypes.any),
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  page: PropTypes.oneOf(['space', 'post']).isRequired,
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  spacebox: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

Post.defaultProps = {
  authUser: null,
};

export default Post;
