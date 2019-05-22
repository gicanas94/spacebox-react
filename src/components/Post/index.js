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
`;

const StyledTitleAndDateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledContent = styled.p`
  margin-bottom: 0;
  white-space: pre-wrap;
  word-break: break-all;
`;

const StyledDate = styled.div`
  color: ${props => props.theme.components.Post.createdAtDate.color};
  cursor: help;
  font-size: ${props => props.theme.components.Post.createdAtDate.fontSize};
  font-weight: ${props => props.theme.components.Post.createdAtDate.fontWeight};
  height: fit-content;
  text-align: right;
  z-index: 1;
`;

const StyledActionsWrapper = styled.div`
  padding-top: 10px;
  user-select: none;
`;

const StyledHeart = styled(Heart)`
  color: ${props => props.theme.components.Post.heart.noLikeColor};
  cursor: pointer;
  width: 33px;

  &:active {
    transform: scale(0.9);
  }

  ${props => props.authUserLike && `
    color: ${props.theme.components.Post.heart.likeColor};
  `}

  ${props => props.disabled && `
    cursor: auto;
  `}

  ${props => !props.disabled && `
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
      1000,
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
      likeInProgress,
      onLikeClickHandler,
      post,
      spacebox,
      spaceboxId,
      user,
    } = this.props;

    const { createdAt } = this.state;

    return (
      <StyledBox fullWidth margin="0">
        <StyledTitleAndDateWrapper>
          {spacebox
            ? (
              <Link to={{
                pathname: `${ROUTES.SPACE_BASE}/${spacebox.slug}/${post.slug}`,
                state: {
                  post,
                  spacebox,
                  spaceboxId,
                  user,
                },
              }}
              >
                <h3>{post.title}</h3>
              </Link>
            )
            : <h3>{post.title}</h3>
          }

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
          <StyledHeart
            authUserLike={
              authUser && post.likes && post.likes.includes(authUser.uid)
            }
            data-for={`like-${post.slug}`}
            data-tip="You need to be logged in to like a post"
            disabled={likeInProgress || !authUser || !authUser.emailVerified}
            onClick={
              likeInProgress || !authUser || !authUser.emailVerified
                ? null
                : onLikeClickHandler
            }
          />
        </StyledActionsWrapper>

        <Tooltip
          delayShow={500}
          effect="solid"
          id={post.createdAt.toString()}
          place="left"
        />

        {(!authUser || !authUser.emailVerified) && (
          <Tooltip
            effect="solid"
            id={`like-${post.slug}`}
            place="right"
          />
        )}
      </StyledBox>
    );
  }
}

Post.propTypes = {
  authUser: PropTypes.objectOf(PropTypes.any),
  likeInProgress: PropTypes.bool.isRequired,
  onLikeClickHandler: PropTypes.func.isRequired,
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  spacebox: PropTypes.objectOf(PropTypes.any),
  spaceboxId: PropTypes.string,
  user: PropTypes.objectOf(PropTypes.any),
};

Post.defaultProps = {
  authUser: null,
  spacebox: null,
  spaceboxId: null,
  user: null,
};

export default Post;
