import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAcMSkXD0yvAhMAYot3hkgNiQk_ivbRJcQ",
  authDomain: "social-media-v.firebaseapp.com",
  projectId: "social-media-v",
  storageBucket: "social-media-v.appspot.com",
  messagingSenderId: "861782803116",
  appId: "1:861782803116:web:4e35f5c0c6a022bb27d509",
  measurementId: "G-7P7CHKZFB1",
};

const firebaseApp =
  firebase.apps && firebase.apps.length > 0
    ? firebase.apps[0]
    : firebase.initializeApp(config);

export const db = firebaseApp.firestore();

export const auth = firebase.auth();
