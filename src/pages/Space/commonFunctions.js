const updateSpaceboxLikes = (
  authUser,
  firebase,
  post,
  resolvePromise,
  rejectPromise,
) => {
  const spaceboxRef = firebase.getSpacebox(post.sid);

  spaceboxRef.get()
    .then((document) => {
      spaceboxRef.update({
        likes: post.likes.includes(authUser.uid)
          ? document.data().likes + 1
          : document.data().likes - 1,
      });
    })
    .then(() => resolvePromise())
    .catch(error => rejectPromise(error));
};

export const caca = 1;

export const likePost = (authUser, firebase, likedPost) => (
  new Promise((resolvePromise, rejectPromise) => {
    const postRef = firebase.getPost(likedPost.slug, likedPost.sid);

    postRef.get()
      .then((document) => {
        const post = document.data();

        post.likes = post.likes.includes(authUser.uid)
          ? post.likes.splice(post.likes.indexOf(authUser.uid), 0)
          : post.likes.concat([authUser.uid]);

        postRef.set({
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
