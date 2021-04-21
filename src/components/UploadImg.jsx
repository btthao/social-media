import React, { useState } from "react";
import { storage } from "../app/firebase";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { mixin } from "../styles/mixin";
import { changeImg } from "../utils/User";
import { useSelector } from "react-redux";
import { selectUser } from "../utils/userSlice";
import CloseIcon from "@material-ui/icons/Close";

const UploadImg__container = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${theme.color.secondary1};
  padding: 2rem 1rem;
  display: grid;
  grid-gap: 1.2rem;
  place-items: center;
  ${mixin.borderR}
  width: 50%;
  min-width: 27rem;
  max-width: 40rem;
  height: 95%;
  max-height: 20rem;
  overflow: scroll;

  h4 {
    width: 100%;
    font-size: 2rem;
    font-weight: 500;
    text-align: center;
    border-bottom: 0.1rem solid ${theme.color.secondary3};
    padding-bottom: 1rem;
  }
  label {
    font-size: 1.6rem;
    background-color: ${theme.color.primary4};
    padding: 1.3rem 0.8rem;
    border-radius: 1rem;
    color: ${theme.color.secondary1};
    min-width: 13rem;
    text-align: center;
    cursor: pointer;
    ${mixin.flexCenter}
    ${mixin.transition}
    .icon {
      font-size: 2rem;
      margin-right: 0.5rem;
    }
    &:hover {
      background-color: ${theme.color.primary5};
    }
  }
  #myimg {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -10;
  }
  button {
    background: none;
    font-size: 1.6rem;
    color: ${theme.color.primary1};
    padding-bottom: 1rem;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const UploadImg__close = styled(CloseIcon)`
  position: absolute;
  top: 4%;
  right: 4%;
  color: ${theme.color.primary4};
  cursor: pointer;
  font-size: 1.7rem !important;
`;

function UploadImg({ onClick }) {
  const id = useSelector(selectUser).id;
  const [imgFile, setImgFile] = useState("");
  const [text, setText] = useState("Save");

  const handleImgFile = (e) => {
    setText("Save");
    if (/\.(jpe?g|png|gif)$/i.test(e.target.files[0].name) === false) {
      alert("This is not an image. Please choose another file.");
    } else {
      setImgFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imgFile) {
      const uploadToFB = storage.ref(`/images/${id}`).put(imgFile);

      uploadToFB.on(
        "state_changed",
        (snapshot) => {
          setText("Saving...");
        },
        (err) => {
          console.log(err);
        },
        () => {
          storage
            .ref("images")
            .child(id)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              changeImg({
                id,
                url: fireBaseUrl,
              });
              setImgFile("");
              setText("Saved");
            });
        }
      );
    }
  };

  return (
    <UploadImg__container onSubmit={handleSubmit}>
      <UploadImg__close onClick={onClick} />
      <h4>Update profile photo</h4>
      <input type="file" id="myimg" name="myimg" onChange={handleImgFile} />
      <label htmlFor="myimg">
        <PhotoCameraIcon className="icon" />
        {imgFile
          ? `${
              imgFile.name.length > 17
                ? imgFile.name.substring(0, 14) + "..."
                : imgFile.name
            }`
          : "Upload photo"}
      </label>
      <button type="submit">{text}</button>
    </UploadImg__container>
  );
}

export default UploadImg;
