import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Post from '../Post';

const StyledWrapper = styled.div`
  div {
    margin-bottom: 10px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;

const ListOfPosts = ({ posts, spacebox, user }) => (
  <StyledWrapper>
    {posts.map(post => (
      <Post key={post.createdAt} post={post} spacebox={spacebox} user={user} />
    ))}
  </StyledWrapper>
);

ListOfPosts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  spacebox: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ListOfPosts;
