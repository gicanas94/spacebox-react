import _ from 'lodash';

import {
  Comments,
  CommentAlt,
  Heart,
  Link as LinkIcon,
  Trash,
} from 'styled-icons/fa-solid';

import { FormattedRelativeTime, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Transition } from 'react-spring/renderprops';

import Box from '../Box';
import Comment from './Comment';
import CommentForm from '../../forms/Comment';
import PostLink from './PostLink';
import { ROUTES } from '../../constants';
import Tooltip from '../Tooltip';
import { transition, transitionProps } from '../../styles';

const StyledSelectedPostWrapper = styled.div`
  background: ${({ theme }) => theme.components.post.selected.backgroundBorder};
  border: ${({ theme }) => theme.components.post.selected.border};
  padding: 5px;

  ${({ selectedBoxWrapperRoundedBorder, theme }) =>
    selectedBoxWrapperRoundedBorder &&
    `
      border-radius: ${theme.global.borderRadius};
    `}
`;

const StyledTitleAndDateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const StyledCopyPostLinkIcon = styled(LinkIcon)`
  color: ${({ theme }) => theme.components.post.copyPostLinkIcon.color};
  height: 22px;
  margin-right: 10px;
  min-height: 22px;
  min-width: 22px;
  width: 22px;
`;

const StyledTitle = styled.h3`
  cursor: pointer;
  margin-bottom: 0;
  transition: transform ${transition.speed.superfast} linear;

  &:active {
    transform: translateY(2px);
  }
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
  color: ${({ theme }) =>
    theme.components.post.createdAtDate.dateFromNow.color};
  font-size: ${({ theme }) =>
    theme.components.post.createdAtDate.dateFromNow.fontSize};
  font-weight: ${({ theme }) =>
    theme.components.post.createdAtDate.dateFromNow.fontWeight};
`;

const StyledLongDate = styled.span`
  color: ${({ theme }) => theme.components.post.createdAtDate.longDate.color};
  font-size: ${({ theme }) =>
    theme.components.post.createdAtDate.longDate.fontSize};
`;

const StyledActionsAndStatsWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
`;

const StyledActions = styled.div`
  user-select: none;

  > * {
    margin-right: 20px;
  }

  > *:last-of-type {
    margin-right: 0;
  }
`;

const StyledStats = styled.div`
  color: ${({ theme }) => theme.components.post.stats.color};
  font-size: ${({ theme }) => theme.components.post.stats.fontSize};
  user-select: none;
`;

const StyledLikesStatIcon = styled(Heart)`
  height: 13px;
  margin-right: 4px;
  min-height: 13px;
  min-width: 13px;
  width: 13px;
`;

const StyledCommentsStatIcon = styled(Comments)`
  height: 13px;
  margin: 0 4px;
  min-height: 13px;
  min-width: 13px;
  width: 13px;
`;

const StyledLikePostIcon = styled(Heart)`
  cursor: pointer;
  height: 30px;
  min-height: 30px;
  min-width: 30px;
  width: 30px;

  ${({ authUserLike, theme }) =>
    authUserLike &&
    `
    color: ${theme.components.post.likePostIcon.likeColor};
  `}

  ${({ authUserLike, theme }) =>
    !authUserLike &&
    `
    color: ${theme.components.post.likePostIcon.noLikeColor};
  `}

  ${({ disabled }) =>
    !disabled &&
    `
    transition: transform ${transition.speed.superfast} linear;

    &:active {
      transform: translateY(2px);
    }
  `}
`;

const StyledCommentPostIcon = styled(CommentAlt)`
  color: ${({ theme }) => theme.components.post.commentPostIcon.color};
  cursor: pointer;
  height: 28px;
  min-height: 28px;
  min-width: 28px;
  width: 28px;

  ${({ disabled }) =>
    !disabled &&
    `
    transition: transform ${transition.speed.superfast} linear;

    &:active {
      transform: translateY(2px);
    }
  `}
`;

const StyledDeletePostIcon = styled(Trash)`
  color: ${({ theme }) => theme.components.post.deletePostIcon.color};
  cursor: pointer;
  min-height: 30px;
  min-width: 28px;
  height: 30px;
  width: 28px;
  transition: transform ${transition.speed.superfast} linear;

  &:active {
    transform: translateY(2px);
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
  cursor: pointer;
  font-weight: ${({ theme }) =>
    theme.components.post.seeOrHideComments.fontWeight};

  &:hover {
    text-decoration: underline;
  }
`;

const Post = ({
  alertSetAction,
  authUser,
  confirmationModalOpenAction,
  deletePostCallback,
  firebase,
  post,
  selected,
  selectedBoxWrapperRoundedBorder,
  spacebox,
}) => {
  const [commentsLimit, setCommentsLimit] = useState(2);
  const [likeInProgress, setLikeInProgress] = useState(false);
  const [postLikes, setPostLikes] = useState(post.likes || []);
  const [postComments, setPostComments] = useState(post.comments || []);
  const [commentFormIsVisible, setCommentFormIsVisible] = useState(false);
  const [postLinkIsVisible, setPostLinkIsVisible] = useState(false);
  const postLinkInputId = `post-link-textarea_${post.slug}`;
  const commentFormTextareaId = `comment-form-textarea_${post.slug}`;

  const returnUrl = queryString.stringify({
    returnUrl: `${ROUTES.SPACE_BASE}/${spacebox.slug}/${post.slug}`,
  });

  const intl = useIntl();

  const handleDeletePostIconClick = () =>
    new Promise((resolve, reject) =>
      (async () => {
        try {
          alertSetAction();

          await firebase.db.runTransaction(async (transaction) => {
            const spaceboxRef = firebase.spacebox(spacebox.slug);
            const postRef = firebase.post(spacebox.slug, post.slug);
            const spaceboxDocument = await transaction.get(spaceboxRef);
            const postDocument = await transaction.get(postRef);

            transaction.update(spaceboxRef, {
              likes:
                spaceboxDocument.data().likes -
                postDocument.data().likes.length,
            });

            transaction.delete(postRef);
          });

          deletePostCallback(post);
          resolve();

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
      })(),
    );

  const handleLikePostIconClick = () => {
    firebase.db.runTransaction(async (transaction) => {
      try {
        alertSetAction();
        setLikeInProgress(true);

        const spaceboxRef = firebase.spacebox(spacebox.slug);
        const postRef = firebase.post(spacebox.slug, post.slug);
        const spaceboxDocument = await transaction.get(spaceboxRef);
        const postDocument = await transaction.get(postRef);

        const userAlreadyLikeThePost = postDocument
          .data()
          .likes.includes(authUser.uid);

        if (userAlreadyLikeThePost) {
          const newPostLikes = postDocument
            .data()
            .likes.filter((like) => like.uid === authUser.uid);

          setPostLikes(newPostLikes);

          transaction.update(postRef, { likes: newPostLikes });

          transaction.update(spaceboxRef, {
            likes: (spaceboxDocument.data().likes -= 1),
          });
        } else {
          setPostLikes([...postDocument.data().likes, authUser.uid]);

          transaction.update(postRef, {
            likes: [...postDocument.data().likes, authUser.uid],
          });

          transaction.update(spaceboxRef, {
            likes: (spaceboxDocument.data().likes += 1),
          });
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

  const handleSeeCommentsClick = () => setCommentsLimit(commentsLimit + 2);

  const handleHideCommentsClick = () => setCommentsLimit(0);

  const postCommentsChangeCallback = (comment, typeOfUpdate) => {
    switch (typeOfUpdate) {
      case 'add':
        setPostComments([...postComments, comment]);
        break;
      default:
    }
  };

  const likePostIcon = (
    <StyledLikePostIcon
      authUserLike={authUser && postLikes.includes(authUser.uid)}
      data-for={`like-heart-icon_${post.slug}`}
      data-tip={
        !authUser
          ? intl.formatMessage({
              id: 'components.post.iconsTooltips.needLoggedInToLike',
            })
          : intl.formatMessage({
              id: 'components.post.iconsTooltips.needValidateEmailToLike',
            })
      }
      disabled={likeInProgress || !authUser || !authUser.emailVerified}
      onClick={
        likeInProgress || !authUser || !authUser.emailVerified
          ? null
          : () => handleLikePostIconClick()
      }
      role="button"
    />
  );

  const commentPostIcon = (
    <StyledCommentPostIcon
      data-for={`comment-icon_${post.slug}`}
      data-tip={
        !authUser
          ? intl.formatMessage({
              id: 'components.post.iconsTooltips.needLoggedInToComment',
            })
          : intl.formatMessage({
              id: 'components.post.iconsTooltips.needValidateEmailToComment',
            })
      }
      disabled={!authUser || !authUser.emailVerified}
      onClick={
        !authUser || !authUser.emailVerified
          ? null
          : () => setCommentFormIsVisible(!commentFormIsVisible)
      }
    />
  );

  const deletePostIcon = (
    <StyledDeletePostIcon
      data-for={`trash-icon_${post.slug}`}
      data-tip={intl.formatMessage({
        id: 'components.post.iconsTooltips.deletePost',
      })}
      onClick={() =>
        !likeInProgress &&
        confirmationModalOpenAction({
          content: 'components.post.deletePost.confirmationModal.content',
          onConfirmHandler: handleDeletePostIconClick,
          title: 'components.post.deletePost.confirmationModal.title',
        })
      }
    />
  );

  const postBox = (
    <Box margin="0" noBorder={selected} padding="20px">
      <StyledTitleAndDateWrapper>
        <StyledTitle onClick={() => setPostLinkIsVisible(!postLinkIsVisible)}>
          <StyledCopyPostLinkIcon />
          {post.title}
        </StyledTitle>

        <StyledCreatedAtDate>
          <StyledDateFromNow>
            <FormattedRelativeTime
              numeric="auto"
              updateIntervalInSeconds={1}
              value={
                (new Date(post.createdAt).getTime() - new Date().getTime()) /
                1000
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

      {postLinkIsVisible && (
        <Transition
          items={postLinkIsVisible}
          {...transitionProps.components.post.postLink}
        >
          {(postLink) =>
            postLink &&
            ((styleProps) => (
              <PostLink
                inputId={postLinkInputId}
                link={`${window.location.origin}${ROUTES.SPACE_BASE}/${spacebox.slug}/${post.slug}`}
                style={styleProps}
              />
            ))
          }
        </Transition>
      )}

      <StyledContent>{post.content}</StyledContent>

      <StyledActionsAndStatsWrapper>
        <StyledActions>
          {!authUser && (
            <>
              <Link
                to={{
                  pathname: ROUTES.SIGN_IN,
                  search: `${returnUrl}`,
                }}
              >
                {likePostIcon}
              </Link>

              <Link
                to={{
                  pathname: ROUTES.SIGN_IN,
                  search: `${returnUrl}`,
                }}
              >
                {commentPostIcon}
              </Link>
            </>
          )}

          {authUser && !authUser.emailVerified && (
            <>
              <Link
                to={{
                  pathname: ROUTES.VERIFY_EMAIL,
                  search: `${returnUrl}`,
                }}
              >
                {likePostIcon}
              </Link>

              <Link
                to={{
                  pathname: ROUTES.VERIFY_EMAIL,
                  search: `${returnUrl}`,
                }}
              >
                {commentPostIcon}
              </Link>
            </>
          )}

          {authUser && authUser.emailVerified && (
            <>
              {likePostIcon}
              {commentPostIcon}
            </>
          )}

          {authUser && authUser.uid === spacebox.uid && (
            <>
              {deletePostIcon}

              <Tooltip
                effect="solid"
                id={`trash-icon_${post.slug}`}
                place="right"
              />
            </>
          )}
        </StyledActions>

        <StyledStats>
          {postLikes.length > 0 && (
            <>
              <StyledLikesStatIcon />
              {intl.formatNumber(postLikes.length)}
            </>
          )}

          {postComments.length > 0 && (
            <>
              <StyledCommentsStatIcon />
              {intl.formatNumber(postComments.length)}
            </>
          )}
        </StyledStats>
      </StyledActionsAndStatsWrapper>

      {authUser && authUser.emailVerified && commentFormIsVisible && (
        <StyledCommentFormWrapper>
          <Transition
            items={commentFormIsVisible}
            {...transitionProps.forms.comment}
          >
            {(commentForm) =>
              commentForm &&
              ((styleProps) => (
                <div style={styleProps}>
                  <CommentForm
                    alertSetAction={alertSetAction}
                    authUser={authUser}
                    firebase={firebase}
                    postCommentsChangeCallback={postCommentsChangeCallback}
                    postSlug={post.slug}
                    sid={post.sid}
                    textareaId={commentFormTextareaId}
                  />
                </div>
              ))
            }
          </Transition>
        </StyledCommentFormWrapper>
      )}

      {postComments.length > 0 && (
        <StyledCommentsWrapper>
          {_.orderBy(postComments, 'createdAt', 'desc')
            .slice(0, commentsLimit)
            .map((comment) => (
              <Comment
                comment={comment}
                key={comment.slug}
                postUid={post.uid}
              />
            ))}

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
        <>
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
        </>
      )}
    </Box>
  );

  return (
    <>
      {selected ? (
        <StyledSelectedPostWrapper
          selectedBoxWrapperRoundedBorder={selectedBoxWrapperRoundedBorder}
        >
          {postBox}
        </StyledSelectedPostWrapper>
      ) : (
        postBox
      )}
    </>
  );
};

Post.propTypes = {
  alertSetAction: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
  confirmationModalOpenAction: PropTypes.func.isRequired,
  deletePostCallback: PropTypes.func.isRequired,
  firebase: PropTypes.objectOf(PropTypes.any).isRequired,
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  selected: PropTypes.bool,
  selectedBoxWrapperRoundedBorder: PropTypes.bool,
  spacebox: PropTypes.objectOf(PropTypes.any).isRequired,
};

Post.defaultProps = {
  selected: false,
  selectedBoxWrapperRoundedBorder: true,
};

export default Post;
