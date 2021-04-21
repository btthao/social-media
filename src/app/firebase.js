/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import firebase from "firebase";
import "firebase/storage";


const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "social-media-v.firebaseapp.com",
    projectId: "social-media-v",
    storageBucket: "social-media-v.appspot.com",
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const firebaseApp =
    firebase.apps && firebase.apps.length > 0 ?
    firebase.apps[0] :
    firebase.initializeApp(config);

export const db = firebaseApp.firestore();

export const auth = firebase.auth();

export const storage = firebase.storage();