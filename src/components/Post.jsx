import React, { useState, useEffect, forwardRef } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { mixin, breakpoint } from "../styles/mixin";
import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";
import { selectUser } from "../utils/userSlice";
import Comments from "./Comments";
import PostIcons from "./PostIcons";
import { Element } from "react-scroll";
import { db } from "../app/firebase";
import { capitalize } from "../utils/User";

const Post__container = styled(Element)`
  width: 100%;
  padding: 2rem;
  background: ${theme.color.secondary1};
  ${mixin.borderR}
  display: grid;
  grid-gap: 1.4rem;
  box-shadow: 2px 3px 10px 0px ${theme.color.secondary3};
  margin-bottom: 1.5rem;
  @media ${breakpoint.mobileL} {
    padding: 1.5rem;
  }
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
      color: ${theme.color.primary3};
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
  white-space: pre-wrap;
  width: 100%;
  p {
    font-size: 1.4rem;
  }
`;

const Post__avatar = styled(Avatar)`
  &&& {
    background-color: ${theme.color.primary4};
    font-size: 1.6rem;
    width: 3.6rem;
    height: 3.6rem;
  }
`;

const Post = ({ postId, content, name, createdAt, userId }, ref) => {
  const currentUid = useSelector(selectUser).id;
  const [imgUrl, setImgUrl] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [totalLikes, setTotalLikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  // get user's profile pic and comments
  useEffect(() => {
    db.collection("users")
      .doc(userId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setImgUrl(doc.data().imgUrl);
        }
      });
    db.collection("comments")
      .doc(postId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setAllComments(doc.data().allComments);
        }
      });
    db.collection("likes")
      .doc(postId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const likeList = doc.data().likedBy;

          setTotalLikes(likeList);
          likeList.findIndex((obj) => obj.currentUid == currentUid) > -1
            ? setLiked(true)
            : setLiked(false);
        }
      });
    setLoading(false);
  }, []);
  if (loading) {
    return null;
  }
  return (
    <Post__container name={postId} ref={ref}>
      <Post__user>
        <Post__avatar alt={capitalize(name)} src={imgUrl || "./img.png"} />
        <div className="info">
          <h5>{name}</h5>
          <p>{createdAt}</p>
        </div>
      </Post__user>
      <Post__content>
        <p>{content}</p>
      </Post__content>
      <PostIcons
        postId={postId}
        userId={userId}
        totalComments={allComments.length}
        totalLikes={totalLikes}
        liked={liked}
      />
      <Comments postId={postId} allComments={allComments} />
    </Post__container>
  );
};

export default forwardRef(Post);
