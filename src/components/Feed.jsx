import React, { useState, useEffect } from "react";
import Input from "./Input";
import Post from "./Post";
import styled from "styled-components";
import { breakpoint } from "../styles/mixin";
import { db } from "../app/firebase";
import FlipMove from "react-flip-move";

const Feed__container = styled.div`
  width: 100%;
  min-width: 46rem;
  @media ${breakpoint.mobileL} {
    min-width: 28rem;
  }
`;

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <Feed__container>
      <Input />
      <FlipMove
        staggerDelayBy={50}
        appearAnimation="elevator"
        enterAnimation="accordionVertical"
        leaveAnimation="elevator"
      >
        {posts.map(({ id, data }) => (
          <div key={id}>
            <Post postId={id} {...data} />
          </div>
        ))}
      </FlipMove>
    </Feed__container>
  );
}

export default Feed;
