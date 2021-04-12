import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { theme } from "../styles/theme";
import { mixin, breakpoint } from "../styles/mixin";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSelector } from "react-redux";
import { selectUser } from "../utils/userSlice";
import { deletePost } from "../utils/Posts";
import { likePost } from "../utils/LikePost";
import { db } from "../app/firebase";
const PostIcons__container = styled.div`
  display: flex;
`;

const PostIcons__section = styled.div`
  ${mixin.flexCenter}
  margin-right: 1.3rem;
  p {
    font-size: 1.2rem;
    line-height: 2rem;
  }
  .icon {
    margin-right: 0.3rem;
    height: 2rem;
    font-size: 2rem;
    color: ${theme.color.secondary2};
    cursor: pointer;
  }
  .icon.trash {
    color: #d65e5e;
  }
`;

const PostIcons__like = styled(FavoriteIcon)`
  ${({ liked }) =>
    liked
      ? css`
          color: ${theme.color.primary3} !important;
        `
      : css`
          color: ${theme.color.secondary2};
        `}
`;

function PostIcons({ postId, userId }) {
  const currentUid = useSelector(selectUser).id;
  const [totalLikes, setTotalLikes] = useState([]);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    db.collection("likes").onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.id === postId) {
          const likeList = doc.data().likedBy;
          setTotalLikes(likeList);
          likeList.indexOf(currentUid) > -1 ? setLiked(true) : setLiked(false);
        }
      });
    });
  }, []);

  const trashThis = () => {
    deletePost({ postId, userId });
  };

  const likeThis = () => {
    likePost({ postId, userId: currentUid });
  };
  return (
    <PostIcons__container>
      <PostIcons__section>
        <PostIcons__like className="icon" onClick={likeThis} liked={liked} />
        <p>
          {totalLikes.length} {totalLikes.length > 1 ? "likes" : "like"}
        </p>
      </PostIcons__section>
      <PostIcons__section>
        <CommentIcon className="icon" />
        <p>0 comment</p>
      </PostIcons__section>
      {currentUid === userId && (
        <PostIcons__section>
          <DeleteIcon className="icon trash" onClick={trashThis} />
        </PostIcons__section>
      )}
    </PostIcons__container>
  );
}

export default PostIcons;
