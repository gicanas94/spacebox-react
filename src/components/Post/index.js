import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import Box from '../Box';
import { ROUTES } from '../../constants';
import Tooltip from '../Tooltip';

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
      post,
      spacebox,
      spaceboxId,
      user,
    } = this.props;

    const { createdAt } = this.state;

    return (
      <Box fullWidth margin="0">
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

            <Tooltip
              effect="solid"
              id={post.createdAt.toString()}
              place="top"
            />
          </StyledDate>
        </StyledTitleAndDateWrapper>

        <StyledContent>
          {post.content}
        </StyledContent>
      </Box>
    );
  }
}

Post.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  spacebox: PropTypes.objectOf(PropTypes.any),
  spaceboxId: PropTypes.string,
  user: PropTypes.objectOf(PropTypes.any),
};

Post.defaultProps = {
  spacebox: null,
  spaceboxId: null,
  user: null,
};

export default Post;
