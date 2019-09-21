import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.emailAuthProvider = app.auth.EmailAuthProvider;
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // ---------------------------------------------------------------------------
  // Auth API ------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  doCreateUserWithEmailAndPassword = (email, password) => (
    this.auth.createUserWithEmailAndPassword(email, password)
  )

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  doSendEmailVerification = () => (
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    })
  )

  doSignInWithEmailAndPassword = (email, password) => (
    this.auth.signInWithEmailAndPassword(email, password)
  )

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () => this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => this.auth.signOut();

  // ---------------------------------------------------------------------------
  // Merge database user and auth user -----------------------------------------
  // ---------------------------------------------------------------------------
  onAuthUserListener = (next, fallback) => this.auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      this.getUser(authUser.uid).onSnapshot(document => (
        next({
          createdAt: (document.data() && document.data().createdAt) || '',
          email: authUser.email,
          emailVerified: authUser.emailVerified,
          isAdmin: (document.data() && document.data().isAdmin) || false,
          providerData: authUser.providerData,
          uid: authUser.uid,
          username: (document.data() && document.data().username) || '',
        })
      ));
    } else {
      fallback();
    }
  });

  // ---------------------------------------------------------------------------
  // Spacebox API --------------------------------------------------------------
  // ---------------------------------------------------------------------------
  createSpacebox = spacebox => (
    this.db.collection('spaceboxes').doc(spacebox.slug).set(spacebox)
  );

  getAllVisibleSpaceboxes = () => (
    this.db.collection('spaceboxes').where('visible', '==', true)
  );

  getSpacebox = sid => this.db.collection('spaceboxes').doc(sid);

  updateSpacebox = (sid, newData) => (
    this.db.collection('spaceboxes').doc(sid).update(newData)
  );

  // ---------------------------------------------------------------------------
  // Post API ------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  createPost = (post, sid) => (
    this.getSpacebox(sid).collection('posts').doc(post.slug).set(post)
  )

  deletePost = (sid, pid) => (
    this.getSpacebox(sid).collection('posts').doc(pid).delete()
  );

  getPost = (sid, pid) => (
    this.getSpacebox(sid).collection('posts').doc(pid)
  )

  getSpaceboxPosts = sid => (
    this.getSpacebox(sid).collection('posts')
  );

  // ---------------------------------------------------------------------------
  // User API ------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  getAllUsers = () => this.db.collection('users');

  getUser = uid => this.db.collection('users').doc(uid);

  getUserSpaceboxes = uid => (
    this.db.collection('spaceboxes').where('uid', '==', uid)
  );
}

export default Firebase;
