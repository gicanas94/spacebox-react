import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

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
    this.storage = app.storage();
    this.emailAuthProvider = app.auth.EmailAuthProvider;
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // ---------------------------------------------------------------------------
  // Auth API ------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  doCreateUserWithEmailAndPassword = (email, password) => (
    new Promise((resolve, reject) => (
      this.auth.createUserWithEmailAndPassword(email, password)
        .then(createdAuthUser => resolve(createdAuthUser))
        .catch(error => reject(error))
    ))
  );

  doFetchSignInMethodsForEmail = email => (
    new Promise((resolve, reject) => (
      this.auth.fetchSignInMethodsForEmail(email)
        .then(signInMethods => resolve(signInMethods))
        .catch(error => reject(error))
    ))
  );

  doLinkAndRetrieveDataWithCredential = credential => (
    new Promise((resolve, reject) => (
      this.auth.currentUser.linkAndRetrieveDataWithCredential(credential)
        .then(() => resolve())
        .catch(error => reject(error))
    ))
  );

  doLinkWithPopup = provider => (
    new Promise((resolve, reject) => (
      this.auth.currentUser.linkWithPopup(this[provider])
        .then(() => resolve())
        .catch(error => reject(error))
    ))
  );

  doUnlink = providerId => (
    new Promise((resolve, reject) => (
      this.auth.currentUser.unlink(providerId)
        .then(() => resolve())
        .catch(error => reject(error))
    ))
  );

  doPasswordReset = email => (
    new Promise((resolve, reject) => (
      this.auth.sendPasswordResetEmail(email)
        .then(() => resolve())
        .catch(error => reject(error))
    ))
  );

  doPasswordUpdate = password => (
    new Promise((resolve, reject) => (
      this.auth.currentUser.updatePassword(password)
        .then(() => resolve())
        .catch(error => reject(error))
    ))
  );

  doSendEmailVerification = () => (
    new Promise((resolve, reject) => (
      this.auth.currentUser.sendEmailVerification({
        url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
      })
        .then(() => resolve())
        .catch(error => reject(error))
    ))
  );

  doSignInWithEmailAndPassword = (email, password) => (
    new Promise((resolve, reject) => (
      this.auth.signInWithEmailAndPassword(email, password)
        .then(authUser => resolve(authUser))
        .catch(error => reject(error))
    ))
  );

  doSignInWithGoogle = () => (
    new Promise((resolve, reject) => (
      this.auth.signInWithPopup(this.googleProvider)
        .then(socialAuthUser => resolve(socialAuthUser))
        .catch(error => reject(error))
    ))
  );

  doSignInWithFacebook = () => (
    new Promise((resolve, reject) => (
      this.auth.signInWithPopup(this.facebookProvider)
        .then(socialAuthUser => resolve(socialAuthUser))
        .catch(error => reject(error))
    ))
  );

  doSignInWithTwitter = () => (
    new Promise((resolve, reject) => (
      this.auth.signInWithPopup(this.twitterProvider)
        .then(socialAuthUser => resolve(socialAuthUser))
        .catch(error => reject(error))
    ))
  );

  doSignOut = () => this.auth.signOut();

  // ---------------------------------------------------------------------------
  // Merge database user and auth user -----------------------------------------
  // ---------------------------------------------------------------------------
  onAuthUserListener = (next, fallback) => this.auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      this.user(authUser.uid).onSnapshot(document => (
        next({
          bio: document.data().bio,
          createdAt: document.data().createdAt,
          email: authUser.email,
          emailVerified: authUser.emailVerified,
          followedSpaceboxes: document.data().followedSpaceboxes,
          language: document.data().language,
          profileImageUrl: document.data().profileImageUrl,
          providerData: authUser.providerData,
          slug: document.data().slug,
          uid: authUser.uid,
          username: document.data().username,
        })
      ));
    } else {
      fallback();
    }
  });

  // ---------------------------------------------------------------------------
  // Spacebox API --------------------------------------------------------------
  // ---------------------------------------------------------------------------
  spacebox = sid => this.db.collection('spaceboxes').doc(sid);

  allVisibleSpaceboxes = () => (
    this.db.collection('spaceboxes').where('visible', '==', true)
  );

  // ---------------------------------------------------------------------------
  // Post API ------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  post = (sid, pid) => this.spacebox(sid).collection('posts').doc(pid);

  spaceboxPosts = sid => this.spacebox(sid).collection('posts');

  // ---------------------------------------------------------------------------
  // User API ------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  user = uid => this.db.collection('users').doc(uid);

  allUsers = () => this.db.collection('users');

  userSpaceboxes = uid => (
    this.db.collection('spaceboxes').where('uid', '==', uid)
  );

  // ---------------------------------------------------------------------------
  // Restricted user data API --------------------------------------------------
  // ---------------------------------------------------------------------------
  userRestrictedData = uid => (
    this.user(uid).collection('restricted').doc('data')
  );

  // ---------------------------------------------------------------------------
  // Global Messaging API ------------------------------------------------------
  // ---------------------------------------------------------------------------
  globalMessage = () => this.db.collection('globalMessages').doc();

  allGlobalMessages = () => this.db.collection('globalMessages');

  allActiveGlobalMessages = () => (
    this.db.collection('globalMessages').where('active', '==', true)
  );
}

export default Firebase;
