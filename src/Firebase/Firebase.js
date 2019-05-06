import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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

    this.emailAuthProvider = app.auth.EmailAuthProvider;
    this.auth = app.auth();
    this.db = app.database();
    this.serverValue = app.database.ServerValue;

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // Auth API
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

  // Merge Auth and User API
  onAuthUserListener = (next, fallback) => this.auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      this.user(authUser.uid)
        .on('value', snapshot => (
          next({
            createdAt: (snapshot.val() && snapshot.val().createdAt) || '',
            email: authUser.email,
            emailVerified: authUser.emailVerified,
            isAdmin: (snapshot.val() && snapshot.val().isAdmin) || false,
            isSpaceboxOwner: (snapshot.val() && snapshot.val().isSpaceboxOwner)
              || false,
            providerData: authUser.providerData,
            uid: authUser.uid,
            username: (snapshot.val() && snapshot.val().username) || '',
          })
        ));
    } else {
      fallback();
    }
  });

  // Spacebox API
  spaceboxes = () => this.db.ref('spaceboxes');

  // Post API
  posts = () => this.db.ref('posts');

  // User API
  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');
}

export default Firebase;
