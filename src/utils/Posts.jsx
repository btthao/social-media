import { db } from "../app/firebase";
import firebase from "firebase";
import moment from "moment";

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

export const deletePost = ({ postId, userId }) => {
  db.collection("posts").doc(postId).delete();
  db.collection("likes").doc(postId).delete();
  db.collection("comments").doc(postId).delete();
  db.collection("notifications")
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        let currentList = doc.data().notifications;
        let newList;
        newList = currentList.filter((obj) => {
          return obj.postId !== postId;
        });
        db.collection("notifications").doc(userId).update({
          notifications: newList,
        });
      }
    });
  db.collection("users")
    .doc(userId)
    .update({
      posts: firebase.firestore.FieldValue.increment(-1),
    });
};
