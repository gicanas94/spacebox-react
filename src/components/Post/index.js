import { Heart } from 'styled-icons/fa-solid/Heart';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import Box from '../Box';
import { device, transition } from '../../styles';
import { ROUTES } from '../../constants';
import Tooltip from '../Tooltip';

const StyledBox = styled(Box)`
  margin-bottom: 10px;

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
  padding-top: 10px;
  user-select: none;
`;

const StyledHeart = styled(Heart)`
  color: ${({ theme }) => theme.components.Post.heart.noLikeColor};
  cursor: pointer;
  width: 33px;

  ${({ authUserLike, theme }) => authUserLike && `
    color: ${theme.components.Post.heart.likeColor};
  `}

  ${({ disabled }) => !disabled && `
    &:active {
      transform: scale(0.9);
    }

    transition: transform ${transition.speed.superfast} linear;
  `}
`;

class Post extends Component {
  constructor(props) {
    super(props);

    const { post } = this.props;

    this.state = { createdAt: moment(post.createdAt).fromNow() };
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

  updateCreatedAtDate = () => {
    const { post } = this.props;

    this.setState({ createdAt: moment(post.createdAt).fromNow() });
  }

  render() {
    const {
      authUser,
      lastPost,
      likeInProgress,
      onLikeClickHandler,
      page,
      post,
      spacebox,
      user,
    } = this.props;

    const { createdAt } = this.state;

    const likeHeart = (
      <StyledHeart
        authUserLike={
          authUser && post.likes && post.likes.includes(authUser.uid)
        }
        data-for={post.slug}
        data-tip={!authUser
          ? 'You need to be logged in to like a post'
          : 'You need to validate your e-mail to like a post'
        }
        disabled={likeInProgress || !authUser || !authUser.emailVerified}
        onClick={
          likeInProgress || !authUser || !authUser.emailVerified
            ? null
            : onLikeClickHandler
        }
      />
    );

    return (
      <StyledBox fullWidth lastPost={lastPost}>
        <StyledTitleAndDateWrapper>
          {page === 'space' && (
            <Link to={{
              pathname: `${ROUTES.SPACE_BASE}/${spacebox.slug}/${post.slug}`,
              state: {
                post,
                spacebox,
                spaceboxId: post.spaceboxId,
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
            data-tip={moment(post.createdAt).format('dddd, MMMM Do YYYY, h:mm')}
          >
            {createdAt}
          </StyledDate>
        </StyledTitleAndDateWrapper>

        <StyledContent>
          {post.content}
        </StyledContent>

        <StyledActionsWrapper>
          {!authUser && <Link to={ROUTES.SIGN_IN}>{likeHeart}</Link>}

          {authUser && !authUser.emailVerified && (
            <Link to={ROUTES.VERIFY_EMAIL}>{likeHeart}</Link>
          )}

          {authUser && authUser.emailVerified && likeHeart}
        </StyledActionsWrapper>

        <Tooltip effect="solid" id={post.createdAt.toString()} place="left" />

        {(!authUser || !authUser.emailVerified) && (
          <Tooltip effect="solid" id={post.slug} place="right" />
        )}
      </StyledBox>
    );
  }
}

Post.propTypes = {
  authUser: PropTypes.objectOf(PropTypes.any),
  lastPost: PropTypes.bool.isRequired,
  likeInProgress: PropTypes.bool.isRequired,
  onLikeClickHandler: PropTypes.func.isRequired,
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
