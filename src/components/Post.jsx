import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { mixin, breakpoint } from "../styles/mixin";
import Avatar from "@material-ui/core/Avatar";

import PostIcons from "./PostIcons";

const Post__container = styled.div`
  padding: 1.4rem 1.8rem;
  background: ${theme.color.secondary1};
  ${mixin.borderR}
  display: grid;
  grid-gap: 1.4rem;
  border: 0.1rem solid ${theme.color.secondary3};
  margin-bottom: 1rem;
  position: relative;
`;

const Post__user = styled.div`
  ${mixin.flexCenter}
  width: 100%;
  justify-content: flex-start;
  .info {
    margin-left: 1rem;
    align-self: flex-start;
    h5 {
      font-size: 1.5rem;
      font-weight: 700;
      color: ${theme.color.primary1};
    }
    p {
      font-size: 1.2rem;
      color: ${theme.color.secondary2};
    }
  }
`;

const Post__content = styled.div`
  border-bottom: 0.1rem solid ${theme.color.secondary3};
  padding-bottom: 1.5rem;
  overflow-wrap: anywhere;
  p {
    font-size: 1.4rem;
  }
`;

const Post__avatar = styled(Avatar)`
  &&& {
    background-color: ${theme.color.primary1};
    font-size: 1.6rem;
    width: 3.6rem;
    height: 3.6rem;
  }
`;

function Post({ postId, content, name, createdAt, userId }) {
  return (
    <Post__container>
      <Post__user>
        <Post__avatar alt={name} src="./img.png" />
        <div className="info">
          <h5>{name}</h5>
          <p>{createdAt}</p>
        </div>
      </Post__user>
      <Post__content>
        <p>{content}</p>
      </Post__content>
      <PostIcons postId={postId} userId={userId} />
    </Post__container>
  );
}

export default Post;
