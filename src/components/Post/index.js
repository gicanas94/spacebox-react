import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import Box from '../Box';
import { ROUTES } from '../../constants';

const StyledTitleAndDateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledContent = styled.p`
  margin-bottom: 0;
  white-space: pre-wrap;
`;

const StyledDate = styled.div`
  color: ${props => props.theme.components.Post.createdAtDate.color};
  font-size: ${props => props.theme.components.Post.createdAtDate.fontSize};
  font-weight: ${props => props.theme.components.Post.createdAtDate.fontWeight};
  text-align: right;
  width: 200px;
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
    const { post, spacebox } = this.props;
    const { createdAt } = this.state;

    return (
      <Box>
        <StyledTitleAndDateWrapper>
          {spacebox
            ? (
              <Link to={{
                pathname: `${ROUTES.SPACE_BASE}/${spacebox.slug}/${post.slug}`,
                state: { post, spacebox },
              }}
              >
                <h3>{post.title}</h3>
              </Link>
            )
            : <h3>{post.title}</h3>
          }

          <StyledDate>
            {createdAt}
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
};

Post.defaultProps = {
  spacebox: null,
};

export default Post;
