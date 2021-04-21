import { db } from "../app/firebase";

//add new user profile
export const newUser = (info) => {
  db.collection("users").doc(info.id).set({
    name: info.name,
    description: "",
    imgUrl: "",
    posts: 0,
  });
};

//update description
export const changeDesc = ({ id, desc }) => {
  const docRef = db.collection("users").doc(id);
  return docRef
    .update({
      description: desc,
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
};

//update profile photo

export const changeImg = ({ id, url }) => {
  const docRef = db.collection("users").doc(id);
  return docRef
    .update({
      imgUrl: url,
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
};

// capitalize name for avatar display
export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
