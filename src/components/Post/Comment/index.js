import Color from 'color';
import { FormattedMessage } from 'react-intl';
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
  border: 0;
  border-bottom-width: ${({ theme }) => theme.components.Comment.borderWidth};
  border-color: ${({ bgColor }) => Color(bgColor).darken(0.2).hex()};
  border-left-width: ${({ theme }) => theme.components.Comment.borderWidth};
  border-style: solid;
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

const StyledCreatedAtDate = styled.div`
  display: flex;
  color: ${({ theme }) => theme.components.Comment.createdAtDate.color};
  font-size: ${({ theme }) => theme.components.Comment.createdAtDate.fontSize};
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
      <span>{moment(comment.createdAt).fromNow()}</span>

      <StyledLongDate>
        {moment(comment.createdAt).format('DD/MM/YY - kk:mm')}
      </StyledLongDate>
    </StyledCreatedAtDate>
  </StyledWrapper>
);

Comment.propTypes = {
  authUser: PropTypes.objectOf(PropTypes.any),
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
};

Comment.defaultProps = {
  authUser: null,
};

export default Comment;
