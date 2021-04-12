import { db } from "../app/firebase";
import firebase from "firebase";

export const likePost = ({ postId, userId }) => {
  const docRef = db.collection("likes").doc(postId);
  let newList;
  docRef.get().then((docSnapshot) => {
    if (!docSnapshot.exists) {
      docRef.set({
        likedBy: [userId],
      });
    } else {
      let currentList = docSnapshot.data().likedBy;
      const index = currentList.indexOf(userId);

      if (index > -1) {
        // if user already liked this post then unlike it
        currentList.splice(index, 1);
      } else {
        currentList.push(userId);
      }

      docRef
        .update({
          likedBy: currentList,
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    }
  });
};
