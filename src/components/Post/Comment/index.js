import Color from 'color';
import { Link } from 'react-router-dom';
import moment from 'moment';
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
  border-color: ${({ bgColor }) => Color(bgColor).darken(0.2).hex()};
  border-right: 0;
  border-style: solid;
  border-top: 0;
  border-width: ${({ theme }) => theme.components.Comment.borderWidth};
  margin: 0;
  padding: 8px;
`;

const StyledP = styled.p`
  display: inline;
  line-height: 1;
  margin-bottom: 0;
  white-space: pre-wrap;
  word-break: break-all;
`;

const StyledUsername = styled(Link)`
  color: inherit;
  font-weight: ${({ theme }) => theme.components.Comment.username.fontWeight};
  margin-right: 10px;
`;

const StyledDate = styled.div`
  display: flex;
  color: ${({ theme }) => theme.components.Comment.date.color};
  font-size: ${({ theme }) => theme.components.Comment.date.fontSize};
  justify-content: space-between;
  padding-left: 4px;
  padding-top: 4px;
`;

const StyledLongDate = styled.span`
  text-align: right;
`;

const Comment = ({ comment }) => (
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

            {comment.uid === comment.postUid
              ? 'Post author'
              : comment.user.username
            }
          </StyledUsername>
        )}
        <span>{comment.content}</span>
      </StyledP>
    </StyledComment>

    <StyledDate>
      <span>{moment(comment.createdAt).fromNow()}</span>

      <StyledLongDate>
        {moment(comment.createdAt).format('DD/MM/YY - kk:mm')}
      </StyledLongDate>
    </StyledDate>
  </StyledWrapper>
);

Comment.propTypes = {
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Comment;
