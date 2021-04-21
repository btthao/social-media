import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { mixin } from "../styles/mixin";
import SendIcon from "@material-ui/icons/Send";
import { useSelector } from "react-redux";
import { selectUser } from "../utils/userSlice";
import { postNewComment, deleteComment } from "../utils/PostComments";
import Comment from "./Comment";

const Comments__container = styled.div`
  width: 100%;
  h4 {
    font-size: 1.3rem;
    font-weight: 500;
    margin-bottom: 1rem;
    margin-left: 1rem;
    color: ${theme.color.primary3};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Comments__form = styled.form`
  background: ${theme.color.secondary4};
  height: 3.8rem;
  width: 100%;
  border-radius: 3rem;
  padding: 0 1.2rem;
  ${mixin.flexBetween}
  input {
    background: none;
    height: 100%;
    width: 100%;
    margin-right: 1.3rem;
    font-size: 1.4rem;
  }
  button {
    cursor: pointer;
    background: none;
    .icon {
      color: ${theme.color.primary5};
      font-size: 2rem;
    }
  }
`;

const Comments__section = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  display: ${({ show }) => (show ? "block" : "none")};
`;

function Comments({ postId, allComments }) {
  const currentUid = useSelector(selectUser).id;
  const name = useSelector(selectUser).name;
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (allComments.length > 0) {
      setShowComments(true);
    } else {
      setShowComments(false);
    }
  }, [allComments]);

  const makeComment = (e) => {
    e.preventDefault();
    if (newComment) {
      const content = { name, currentUid, comment: newComment };
      postNewComment({ postId, content });
      setNewComment("");
    }
  };

  return (
    <Comments__container>
      {allComments.length > 0 && (
        <h4 onClick={() => setShowComments(!showComments)}>
          {showComments ? "Hide comments" : "Show comments"}
        </h4>
      )}
      <Comments__section show={showComments}>
        {allComments.map((comment, index) => (
          <Comment
            key={index}
            content={comment}
            onClick={() => deleteComment({ postId, comment, index })}
            postId={postId}
          />
        ))}
      </Comments__section>
      <Comments__form>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button type="submit" onClick={makeComment}>
          <SendIcon className="icon" />
        </button>
      </Comments__form>
    </Comments__container>
  );
}

export default Comments;
