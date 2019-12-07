import _ from 'lodash';
import { CommentAlt } from 'styled-icons/fa-solid/CommentAlt';
import { Comments } from 'styled-icons/fa-solid/Comments';
import { FormattedRelativeTime, useIntl } from 'react-intl';
import { Heart } from 'styled-icons/fa-solid/Heart';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
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
  margin-left: 3%;
  text-align: right;
  width: 50%;
`;

const StyledDateFromNow = styled.span`
  color: ${({ theme }) => (
    theme.components.post.createdAtDate.dateFromNow.color
  )};
  font-size: ${({ theme }) => (
    theme.components.post.createdAtDate.dateFromNow.fontSize
  )};
  font-weight: ${({ theme }) => (
    theme.components.post.createdAtDate.dateFromNow.fontWeight
  )};
`;

const StyledLongDate = styled.span`
  color: ${({ theme }) => (
    theme.components.post.createdAtDate.longDate.color
  )};
  font-size: ${({ theme }) => (
    theme.components.post.createdAtDate.longDate.fontSize
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
  color: ${({ theme }) => theme.components.post.stats.color};
  font-size: ${({ theme }) => theme.components.post.stats.fontSize};
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
    color: ${theme.components.post.likeHeartIcon.likeColor};
  `}

  ${({ authUserLike, theme }) => !authUserLike && `
    color: ${theme.components.post.likeHeartIcon.noLikeColor};
  `}

  ${({ disabled }) => !disabled && `
    &:active {
      transform: scale(0.9);
    }

    transition: transform ${transition.speed.superfast} linear;
  `}
`;

const StyledCommentIcon = styled(CommentAlt)`
  color: ${({ theme }) => theme.components.post.commentIcon.color};
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
  color: ${({ theme }) => theme.components.post.trashIcon.color};
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
  color: ${({ theme }) => theme.components.post.seeOrHideComments.color};
  cursor: pointer
  font-weight: ${({ theme }) => (
    theme.components.post.seeOrHideComments.fontWeight
  )};

  &:hover {
    text-decoration: underline;
  }
`;

const Post = ({
  alertSetAction,
  authUser,
  confirmationModalCloseAction,
  confirmationModalOpenAction,
  deletePostCallback,
  firebase,
  history,
  page,
  post,
  spacebox,
  user,
}) => {
  const [commentsLimit, setCommentsLimit] = useState(3);
  const [likeInProgress, setLikeInProgress] = useState(false);
  const [postLikes, setPostLikes] = useState(post.likes);
  const [postComments, setPostComments] = useState(post.comments);
  const commentFormId = `comment-form_${post.slug}`;
  const intl = useIntl();

  const [
    commentFormIsVisible,
    setCommentFormIsVisible,
  ] = useStateWithCallback(false, () => {
    if (commentFormIsVisible) document.getElementById(commentFormId).focus();
  });

  const handleDeletePostClick = () => (
    new Promise((resolve, reject) => (
      (async () => {
        try {
          alertSetAction();

          await firebase.db.runTransaction(async (transaction) => {
            const spaceboxRef = firebase.spacebox(spacebox.slug);
            const postRef = firebase.post(spacebox.slug, post.slug);
            const spaceboxDocument = await transaction.get(spaceboxRef);
            const postDocument = await transaction.get(postRef);

            transaction.update(spaceboxRef, {
              likes: spaceboxDocument.data().likes - postDocument.data().likes.length,
            });

            transaction.delete(postRef);
          });

          if (page === 'space') deletePostCallback(post);

          resolve();

          if (page === 'post') {
            history.push(
              `${ROUTES.SPACE_BASE}/${spacebox.slug}`,
              { spacebox },
            );
          }

          alertSetAction({
            message: { id: 'components.post.deletePost.successAlertMessage' },
            type: 'success',
          });
        } catch (error) {
          reject();

          alertSetAction({
            message: error.message,
            type: 'danger',
          });
        }
      })()
    ))
  );

  const handleLikePostClick = () => {
    firebase.db.runTransaction(async (transaction) => {
      try {
        alertSetAction();
        setLikeInProgress(true);

        const spaceboxRef = firebase.spacebox(spacebox.slug);
        const postRef = firebase.post(spacebox.slug, post.slug);
        const spaceboxDocument = await transaction.get(spaceboxRef);
        const postDocument = await transaction.get(postRef);

        const userAlreadyLikeThePost = postDocument.data().likes.includes(
          authUser.uid,
        );

        if (userAlreadyLikeThePost) {
          const newPostLikes = postDocument.data().likes.filter(
            like => like.uid === authUser.uid,
          );

          setPostLikes(newPostLikes);

          transaction.update(postRef, { likes: newPostLikes });

          transaction.update(
            spaceboxRef,
            { likes: spaceboxDocument.data().likes -= 1 },
          );
        } else {
          setPostLikes([...postDocument.data().likes, authUser.uid]);

          transaction.update(
            postRef,
            { likes: [...postDocument.data().likes, authUser.uid] },
          );

          transaction.update(
            spaceboxRef,
            { likes: spaceboxDocument.data().likes += 1 },
          );
        }
      } catch (error) {
        alertSetAction({
          message: error.message,
          type: 'danger',
        });
      } finally {
        setLikeInProgress(false);
      }
    });
  };

  const handleSeeCommentsClick = () => setCommentsLimit(commentsLimit + 3);

  const handleHideCommentsClick = () => setCommentsLimit(0);

  const updatePostCommentsHandler = (comment, typeOfUpdate) => {
    switch (typeOfUpdate) {
      case 'add':
        setPostComments([...postComments, comment]);
        break;
      default:
    }
  };

  const likeHeartIcon = (
    <StyledLikeHeartIcon
      authUserLike={authUser && postLikes.includes(authUser.uid)}
      data-for={`like-heart-icon_${post.slug}`}
      data-tip={!authUser
        ? intl.formatMessage({
          id: 'components.post.iconsTooltips.needLoggedInToLike',
        }) : intl.formatMessage({
          id: 'components.post.iconsTooltips.needValidateEmailToLike',
        })
      }
      disabled={likeInProgress || !authUser || !authUser.emailVerified}
      onClick={likeInProgress || !authUser || !authUser.emailVerified
        ? null
        : () => handleLikePostClick()
      }
    />
  );

  const commentIcon = (
    <StyledCommentIcon
      data-for={`comment-icon_${post.slug}`}
      data-tip={!authUser
        ? intl.formatMessage({
          id: 'components.post.iconsTooltips.needLoggedInToComment',
        }) : intl.formatMessage({
          id: 'components.post.iconsTooltips.needValidateEmailToComment',
        })
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
      data-tip={intl.formatMessage({
        id: 'components.post.iconsTooltips.deletePost',
      })}
      onClick={
        () => !likeInProgress && confirmationModalOpenAction({
          content: 'components.post.deletePost.confirmationModal.content',
          onConfirmHandler: handleDeletePostClick,
          title: 'components.post.deletePost.confirmationModal.title',
        })
      }
    />
  );

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
          <StyledDateFromNow>
            <FormattedRelativeTime
              numeric="auto"
              updateIntervalInSeconds={60}
              value={
                (new Date(post.createdAt).getTime() - new Date().getTime())
                / 1000
              }
            />
          </StyledDateFromNow>

          <StyledLongDate>
            {intl.formatDate(post.createdAt, {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}

            {' - '}

            {intl.formatTime(post.createdAt)}
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
          {postLikes.length > 0 && (
            <Fragment>
              <StyledLikesStatIcon />
              {intl.formatNumber(postLikes.length)}
            </Fragment>
          )}

          {postComments.length > 0 && (
            <Fragment>
              <StyledCommentsStatIcon />
              {intl.formatNumber(postComments.length)}
            </Fragment>
          )}
        </StyledStats>
      </StyledActionsAndStatsWrapper>

      {authUser && authUser.emailVerified && commentFormIsVisible && (
        <StyledCommentFormWrapper>
          <CommentForm
            authUser={authUser}
            postSlug={post.slug}
            sid={post.sid}
            textareaId={commentFormId}
            updatePostCommentsHandler={updatePostCommentsHandler}
          />
        </StyledCommentFormWrapper>
      )}

      {postComments.length > 0 && (
        <StyledCommentsWrapper>
          {_.orderBy(postComments, 'createdAt', 'desc')
            .slice(0, commentsLimit).map(comment => (
              <Comment
                authUser={authUser}
                comment={comment}
                key={comment.slug}
              />
            ))
          }

          {postComments.length > commentsLimit && (
            <StyledSeeOrHideCommentsSpan
              onClick={() => handleSeeCommentsClick()}
            >
              {intl.formatMessage(
                { id: 'components.post.seeCommentsText' },
                {
                  remainingComments: intl.formatNumber(
                    postComments.length - commentsLimit,
                  ),
                },
              )}
            </StyledSeeOrHideCommentsSpan>
          )}

          {commentsLimit >= postComments.length && (
            <StyledSeeOrHideCommentsSpan
              onClick={() => handleHideCommentsClick()}
            >
              {intl.formatMessage({ id: 'components.post.hideCommentsText' })}
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
  authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
  confirmationModalCloseAction: PropTypes.func.isRequired,
  confirmationModalOpenAction: PropTypes.func.isRequired,
  deletePostCallback: PropTypes.func,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any),
  page: PropTypes.oneOf(['space', 'post']).isRequired,
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  spacebox: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

Post.defaultProps = {
  deletePostCallback: null,
  history: null,
};

export default Post;
