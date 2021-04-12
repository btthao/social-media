import React, { useState, useEffect, useRef } from "react";
import Input from "./Input";
import Post from "./Post";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { mixin, breakpoint } from "../styles/mixin";
import { db } from "../app/firebase";

const Feed__container = styled.div`
  width: 100%;
  min-width: 46rem;
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
      {posts.map(({ id, data: { name, content, userId, createdAt } }) => (
        <Post
          key={id}
          name={name}
          content={content}
          createdAt={createdAt}
          userId={userId}
          postId={id}
          // like={false}
        />
      ))}
    </Feed__container>
  );
}

export default Feed;
