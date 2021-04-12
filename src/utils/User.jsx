import { db } from "../app/firebase";
import firebase from "firebase";

//add new user profile
export const newUser = (info) => {
  db.collection("users").doc(info.id).set({
    name: info.name,
    description: "",
    posts: 0,
  });
};

//update description
export const changeDesc = (info) => {
  const docRef = db.collection("users").doc(info.id);
  return docRef
    .update({
      description: info.desc,
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
};
//update posts number
