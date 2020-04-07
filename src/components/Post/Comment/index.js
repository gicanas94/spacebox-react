import Color from 'color';

import {
  FormattedDate,
  FormattedMessage,
  FormattedRelativeTime,
  FormattedTime,
} from 'react-intl';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { ROUTES } from '../../../constants';
import { transition } from '../../../styles';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  opacity: 0.7;
  transition: all ${transition.speed.superfast} linear;

  ${({ isPostAuthor }) => isPostAuthor && `
    opacity: 1;
  `}

  &:hover {
    opacity: 1;
  }
`;

const StyledComment = styled.div`
  background-color: ${({ bgColor }) => bgColor};
  border: 0;
  border-bottom-width: ${({ theme }) => (
    theme.components.post.comment.borderWidth
  )};
  border-color: ${({ bgColor }) => Color(bgColor).darken(0.2).hex()};
  border-left-width: ${({ theme }) => (
    theme.components.post.comment.borderWidth
  )};
  border-style: solid;
  margin: 0;
  padding: 8px;
`;

const StyledP = styled.p`
  display: inline;
  line-height: 1;
  margin-bottom: 0;
  white-space: pre-wrap;
  word-break: break-word;
`;

const StyledUsername = styled(Link)`
  color: inherit;
  font-weight: ${({ theme }) => (
    theme.components.post.comment.username.fontWeight
  )};
  margin-right: 10px;
`;

const StyledCreatedAtDate = styled.div`
  display: flex;
  color: ${({ theme }) => theme.components.post.comment.createdAtDate.color};
  font-size: ${({ theme }) => (
    theme.components.post.comment.createdAtDate.fontSize
  )};
  justify-content: space-between;
  padding-left: 4px;
  padding-top: 4px;
`;

const StyledLongDate = styled.span`
  text-align: right;
`;

const Comment = ({ comment, postUid }) => (
  <StyledWrapper isPostAuthor={comment.uid === comment.postUid}>
    <StyledComment bgColor={comment.bgColor}>

      <StyledP>
        {comment.user && (
          <StyledUsername to={{
            pathname: `${ROUTES.USER_BASE}/${comment.user.slug}`,
            state: {
              user: comment.user,
              uid: comment.uid,
            },
          }}
          >

            {comment.user.uid === postUid
              ? (
                <FormattedMessage id="components.post.comment.postAuthor" />
              ) : comment.user.username
            }
          </StyledUsername>
        )}
        <span>{comment.content}</span>
      </StyledP>
    </StyledComment>

    <StyledCreatedAtDate>
      <span>
        <FormattedRelativeTime
          numeric="auto"
          updateIntervalInSeconds={1}
          value={
            (new Date(comment.createdAt).getTime() - new Date().getTime())
            / 1000
          }
        />
      </span>

      <StyledLongDate>
        <FormattedDate
          day="2-digit"
          month="short"
          value={comment.createdAt}
          year="numeric"
        />

        {' - '}

        <FormattedTime value={comment.createdAt} />
      </StyledLongDate>
    </StyledCreatedAtDate>
  </StyledWrapper>
);

Comment.propTypes = {
  authUser: PropTypes.oneOfType([PropTypes.any]).isRequired,
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
  postUid: PropTypes.string.isRequired,
};

export default Comment;
