import { db } from "../app/firebase";
import moment from "moment";
import { commentNotification, removeCommentNotification } from "./Notification";

export const postNewComment = ({ postId, content }) => {
  const entry = {
    ...content,
    timestamp: moment().format(),
  };
  const docRef = db.collection("comments").doc(postId);
  docRef.get().then((doc) => {
    if (!doc.exists) {
      docRef.set({
        allComments: [entry],
      });
    } else {
      let commentList = doc.data().allComments;
      commentList.push(entry);
      docRef
        .update({
          allComments: commentList,
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    }
  });
  commentNotification({ postId, newComment: content });
};

export const deleteComment = ({ postId, comment, index }) => {
  const docRef = db.collection("comments").doc(postId);
  docRef.get().then((doc) => {
    let commentList = doc.data().allComments;

    commentList.splice(index, 1);
    docRef
      .update({
        allComments: commentList,
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  });

  removeCommentNotification({ postId, commentToDelete: comment });
};
