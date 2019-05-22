import PropTypes from 'prop-types';
import React from 'react';

import Post from '../Post';

const ListOfPosts = ({
  authUser,
  likeInProgress,
  onLikeClickHandler,
  posts,
  spacebox,
  spaceboxId,
  user,
}) => (
  <div>
    {posts.map(post => (
      <Post
        authUser={authUser}
        likeInProgress={likeInProgress}
        key={post.createdAt}
        onLikeClickHandler={() => onLikeClickHandler(post)}
        post={post}
        spacebox={spacebox}
        spaceboxId={spaceboxId}
        user={user}
      />
    ))}
  </div>
);

ListOfPosts.propTypes = {
  authUser: PropTypes.objectOf(PropTypes.any),
  likeInProgress: PropTypes.bool.isRequired,
  onLikeClickHandler: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  spacebox: PropTypes.objectOf(PropTypes.any).isRequired,
  spaceboxId: PropTypes.string.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

ListOfPosts.defaultProps = {
  authUser: null,
};

export default ListOfPosts;
