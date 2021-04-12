import { db } from "../app/firebase";
import firebase from "firebase";
import moment from "moment";

//add post
export const newPost = ({ name, id, inputContent }) => {
  db.collection("posts").add({
    name,
    userId: id,
    content: inputContent,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    createdAt: moment().format("LL") + " at " + moment().format("LT"),
  });
  db.collection("users")
    .doc(id)
    .update({
      posts: firebase.firestore.FieldValue.increment(1),
    });
};

//delete post
export const deletePost = ({ postId, userId }) => {
  db.collection("posts").doc(postId).delete();
  db.collection("likes").doc(postId).delete();
  db.collection("users")
    .doc(userId)
    .update({
      posts: firebase.firestore.FieldValue.increment(-1),
    });
};
