import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { theme } from "../styles/theme";
import { mixin } from "../styles/mixin";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import { useSelector } from "react-redux";
import { selectUser } from "../utils/userSlice";
import { deletePost } from "../utils/Posts";
import { likePost } from "../utils/LikePost";
import { db } from "../app/firebase";
import Popover from "@material-ui/core/Popover";

const PostIcons__container = styled.div`
  display: flex;
  width: 100%;
`;

const PostIcons__section = styled.div`
  ${mixin.flexCenter}
  margin-right: 1.3rem;
  .icon {
    margin-right: 0.3rem;
    height: 2rem;
    font-size: 2rem;
    color: ${theme.color.primary1};
  }
`;

const PostIcons__text = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 2rem;
  &.trash {
    color: ${theme.color.primary6};
    cursor: pointer;
  }
`;

const pop = keyframes`
  0% {
    transform: scale(1);
  }
  10% {
    transform: scale(0.3);
  }
  100% {
    transform: scale(1);
  }
`;

const PostIcons__like = styled(FavoriteIcon)`
  cursor: pointer;
  ${({ like }) =>
    like === "like"
      ? css`
          color: ${theme.color.primary5} !important;
          animation: ${pop} 0.3s 1;
        `
      : css`
          color: ${theme.color.secondary2};
        `}
`;

const Styled__popover = styled(Popover)`
  pointer-events: none !important;
  div {
    padding: 0.4rem 0.3rem;
    h6 {
      font-size: 1.2rem;
      font-weight: 500;
      color: ${theme.color.primary1};
    }
    ul {
      li {
        font-size: 1.2rem;
        color: ${theme.color.primary1};
        margin: 0.2rem 0;
      }
    }
  }
`;

function PostIcons({ postId, userId, totalComments, totalLikes, liked }) {
  const currentUid = useSelector(selectUser).id;
  const name = useSelector(selectUser).name;
  const newLike = { name, currentUid };
  // const [totalLikes, setTotalLikes] = useState([]);
  // const [liked, setLiked] = useState(false);
  const [showLikes, setShowLikes] = useState(null);
  const openLikePopover = Boolean(showLikes);

  // useEffect(() => {
  //   db.collection("likes")
  //     .doc(postId)
  //     .onSnapshot((doc) => {
  //       if (doc.exists) {
  //         const likeList = doc.data().likedBy;
  //         console.log("read at like");
  //         setTotalLikes(likeList);
  //         likeList.findIndex((obj) => obj.currentUid == currentUid) > -1
  //           ? setLiked(true)
  //           : setLiked(false);
  //       }
  //     });
  // }, []);

  const trashThis = () => {
    deletePost({ postId, userId });
  };

  const likeThis = () => {
    likePost({ postId, newLike });
  };

  return (
    <PostIcons__container>
      <PostIcons__section>
        <PostIcons__like
          className="icon"
          onClick={likeThis}
          like={liked ? "like" : undefined}
        />
        <PostIcons__text
          aria-owns={openLikePopover ? "likes-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={(e) =>
            totalLikes.length > 0 && setShowLikes(e.currentTarget)
          }
          onMouseLeave={() => setShowLikes(null)}
        >
          {totalLikes.length} {totalLikes.length > 1 ? "likes" : "like"}
        </PostIcons__text>
        <Styled__popover
          id="likes-popover"
          open={openLikePopover}
          anchorEl={showLikes}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          onClose={() => setShowLikes(null)}
          disableRestoreFocus
        >
          <div>
            <h6>Liked by:</h6>
            <ul>
              {totalLikes.slice(0, 8).map((person) => {
                return <li key={person.currentUid}>{person.name}</li>;
              })}
              {totalLikes.length > 8 && (
                <li>and {totalLikes.length - 8} more... </li>
              )}
            </ul>
          </div>
        </Styled__popover>
      </PostIcons__section>
      <PostIcons__section>
        <CommentIcon className="icon" />
        <PostIcons__text>
          {totalComments} {totalComments > 1 ? "comments" : "comment"}
        </PostIcons__text>
      </PostIcons__section>
      {currentUid === userId && (
        <PostIcons__section>
          <PostIcons__text className="trash" onClick={trashThis}>
            Delete post
          </PostIcons__text>
        </PostIcons__section>
      )}
    </PostIcons__container>
  );
}

export default PostIcons;
