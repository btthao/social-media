import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectUser } from "../utils/userSlice";
import { theme } from "../styles/theme";
import { db } from "../app/firebase";
import { capitalize } from "../utils/User";

const Styled_avatar = styled(Avatar)`
  &&& {
    background-color: ${theme.color.primary5};
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    font-size: ${({ fontSize }) => fontSize};
  }
`;

function StyledAvatar({ size, fontSize }) {
  const name = useSelector(selectUser).name;
  const id = useSelector(selectUser).id;
  const [imgUrl, setImgUrl] = useState("./img.png");

  useEffect(() => {
    db.collection("users")
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          if (doc.data().imgUrl !== "") {
            setImgUrl(doc.data().imgUrl);
          }
        }
      });
  }, []);

  return (
    <Styled_avatar
      alt={capitalize(name)}
      src={imgUrl}
      size={size}
      fontSize={fontSize}
    />
  );
}

export default StyledAvatar;
