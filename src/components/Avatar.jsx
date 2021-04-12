import React from "react";
import Avatar from "@material-ui/core/Avatar";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectUser } from "../utils/userSlice";
import { theme } from "../styles/theme";
const Styled_avatar = styled(Avatar)`
  &&& {
    background-color: lightblue;
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    font-size: ${({ fontSize }) => fontSize};
  }
`;

function StyledAvatar({ size, fontSize, onClick }) {
  const name = useSelector(selectUser).name;
  return (
    <Styled_avatar
      alt={name}
      src="./image.png"
      size={size}
      fontSize={fontSize}
      onClick={onClick}
    />
  );
}

export default StyledAvatar;
