import { db } from "../app/firebase";
import moment from "moment";

export const likeNotification = ({ postId, newLike }) => {
  const sender = newLike.name;
  const senderId = newLike.currentUid;
  const type = "like";
  const timestamp = moment().format();

  db.collection("posts")
    .doc(postId)
    .get()
    .then((docSnapshot) => {
      const recipient = docSnapshot.data().name;
      const recipientId = docSnapshot.data().userId;
      // only send notifications if sender is not post creator
      if (recipientId !== senderId) {
        let entry = {
          recipient,
          recipientId,
          sender,
          senderId,
          postId,
          type,
          timestamp,
        };
        const docRef = db.collection("notifications").doc(recipientId);
        docRef.get().then((doc) => {
          if (!doc.exists) {
            docRef.set({
              notifications: [entry],
            });
          } else {
            let currentList = doc.data().notifications;
            const index = currentList.findIndex(
              (obj) =>
                obj.postId === postId &&
                obj.senderId === senderId &&
                obj.type === type
            );
            if (index > -1) {
              currentList.splice(index, 1);
            } else {
              currentList.push(entry);
            }
            docRef
              .update({
                notifications: currentList,
              })
              .catch((error) => {
                console.error("Error updating document: ", error);
              });
          }
        });
      }
    });
};

export const commentNotification = ({ postId, newComment }) => {
  const { name, currentUid, comment } = newComment;
  const sender = name;
  const senderId = currentUid;
  const content = comment;
  const type = "comment";
  const timestamp = moment().format();

  db.collection("posts")
    .doc(postId)
    .get()
    .then((docSnapshot) => {
      let recipient = docSnapshot.data().name;
      let recipientId = docSnapshot.data().userId;
      if (recipientId !== senderId) {
        let entry = {
          recipient,
          recipientId,
          sender,
          senderId,
          postId,
          type,
          content,
          timestamp,
        };
        let docRef = db.collection("notifications").doc(recipientId);
        docRef.get().then((doc) => {
          if (!doc.exists) {
            docRef.set({
              notifications: [entry],
            });
          } else {
            let currentList = doc.data().notifications;

            currentList.push(entry);

            docRef
              .update({
                notifications: currentList,
              })
              .catch((error) => {
                console.error("Error updating document: ", error);
              });
          }
        });
      }
    });
};

export const removeCommentNotification = ({ postId, commentToDelete }) => {
  const { name, currentUid, comment, timestamp } = commentToDelete;
  const senderId = currentUid;
  const content = comment;
  const type = "comment";
  db.collection("posts")
    .doc(postId)
    .get()
    .then((docSnapshot) => {
      let recipientId = docSnapshot.data().userId;
      if (recipientId !== senderId) {
        let docRef = db.collection("notifications").doc(recipientId);
        docRef.get().then((doc) => {
          let currentList = doc.data().notifications;
          const index = currentList.findIndex(
            (obj) =>
              obj.postId === postId &&
              obj.senderId === senderId &&
              obj.type === type &&
              obj.content === content &&
              obj.timestamp === timestamp
          );

          currentList.splice(index, 1);

          docRef
            .update({
              notifications: currentList,
            })
            .catch((error) => {
              console.error("Error updating document: ", error);
            });
        });
      }
    });
};
