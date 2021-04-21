import { db } from "../app/firebase";
import { likeNotification } from "./Notification";

export const likePost = ({ postId, newLike }) => {
  const docRef = db.collection("likes").doc(postId);

  docRef.get().then((docSnapshot) => {
    if (!docSnapshot.exists) {
      docRef.set({
        likedBy: [newLike],
      });
    } else {
      let currentList = docSnapshot.data().likedBy;
      const index = currentList.findIndex(
        (obj) => obj.currentUid === newLike.currentUid
      );
      // console.log(index);
      if (index > -1) {
        // if user already liked this post then unlike it
        currentList.splice(index, 1);
      } else {
        currentList.push(newLike);
      }

      docRef
        .update({
          likedBy: currentList,
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    }
    likeNotification({ postId, newLike });
  });
};
