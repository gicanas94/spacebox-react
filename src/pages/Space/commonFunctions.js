import _ from 'lodash';

const updateSpaceboxLikes = (
  authUser,
  firebase,
  post,
  resolvePromise,
  rejectPromise,
) => (
  firebase
    .spacebox(post.spaceboxId)
    .once('value')
    .then((spaceboxSnapshot) => {
      firebase.spacebox(post.spaceboxId).update({
        likes: post.likes.includes(authUser.uid)
          ? spaceboxSnapshot.val().likes + 1
          : spaceboxSnapshot.val().likes - 1,
      });
    })
    .then(() => resolvePromise())
    .catch(error => rejectPromise(error))
);

export const likePost = (authUser, firebase, likedPost) => (
  new Promise((resolvePromise, rejectPromise) => {
    firebase
      .posts()
      .orderByChild('slug')
      .equalTo(likedPost.slug)
      .once('value')
      .then((postSnapshot) => {
        const postId = _.keys(postSnapshot.val())[0];
        const post = postSnapshot.val()[postId];

        if (Array.isArray(post.likes)) {
          post.likes = post.likes.includes(authUser.uid)
            ? post.likes.splice(post.likes.indexOf(authUser.uid), 0)
            : post.likes.concat([authUser.uid]);
        } else {
          post.likes = [authUser.uid];
        }

        firebase.post(postId).set({
          likes: post.likes,
          ...post,
        });

        updateSpaceboxLikes(
          authUser,
          firebase,
          post,
          resolvePromise,
          rejectPromise,
        );
      })
      .catch(error => rejectPromise(error));
  })
);
