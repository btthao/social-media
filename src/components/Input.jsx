import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { mixin, breakpoint } from "../styles/mixin";
import Avatar from "./Avatar";
import { newPost } from "../utils/Posts";
import { selectUser } from "../utils/userSlice";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";

const Input__container = styled.div`
  background: ${theme.color.secondary1};
  ${mixin.borderR}
  width: 100%;
  display: flex;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 2px 3px 10px 0px ${theme.color.secondary3};
  @media ${breakpoint.mobileL} {
    padding: 1.5rem;
  }
`;

const Input__form = styled.form`
  flex: 1;
  margin-left: 1.2rem;
  display: grid;
  grid-gap: 1.5rem;
`;

const Input__text = styled.textarea`
  ${mixin.borderR}
  border: 0.1rem solid ${theme.color.secondary4};
  background: ${theme.color.secondary1};
  height: 12rem;
  width: 100%;
  resize: none;
  padding: 0.8rem;
  font-family: inherit;
  font-size: 1.4rem;
  -webkit-appearance: none;
`;
const Input__button = styled.button`
  ${mixin.borderR}
  ${mixin.transition}
  background: ${theme.color.primary4};
  color: ${theme.color.secondary1};
  font-size: 1.8rem;
  width: 100%;
  padding: 0.8rem 0;
  cursor: pointer;
  font-family: inherit;
  &:hover {
    filter: contrast(150%);
  }
`;

function Input() {
  const [inputContent, setInputContent] = useState("");
  const name = useSelector(selectUser).name;
  const id = useSelector(selectUser).id;
  const postToFeed = (e) => {
    e.preventDefault();
    if (inputContent) {
      newPost({ name, id, inputContent });
      setInputContent("");
    }
  };
  return (
    <Input__container>
      <Avatar size="4rem" fontSize="1.8rem" />
      <Input__form>
        <Input__text
          placeholder="Spill the tea here :)"
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
        ></Input__text>
        <Input__button type="submit" onClick={postToFeed}>
          Post
        </Input__button>
      </Input__form>
    </Input__container>
  );
}

export default Input;
