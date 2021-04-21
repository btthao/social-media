import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { useSelector } from "react-redux";
import { selectUser } from "../utils/userSlice";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../app/firebase";
import moment from "moment";
import { capitalize } from "../utils/User";

const Comment__avatar = styled(Avatar)`
  &&& {
    background-color: ${theme.color.primary5};
    font-size: 1.2rem;
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const Comment__container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
`;

const Comment__content = styled.div`
  margin-left: 0.7rem;
  background: ${theme.color.secondary4};
  padding: 0.8rem 1.8rem;
  border-radius: 3rem;
  position: relative;
  min-width: 10rem;
  h6 {
    font-size: 1.3rem;
    font-weight: 600;
  }
  p {
    font-size: 1.3rem;
  }
  div {
    display: flex;
    margin-top: 0.4rem;
    color: ${theme.color.primary3};
    span {
      font-size: 1rem;
      font-weight: 400;
    }
    h5 {
      color: ${theme.color.primary6};
      margin-left: 1rem;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
    }
  }
`;

function Comment({ content, onClick, postId }) {
  const id = useSelector(selectUser).id;
  const [imgUrl, setImgUrl] = useState("");
  const { name, comment, timestamp, currentUid } = content;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    db.collection("users")
      .doc(currentUid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setImgUrl(doc.data().imgUrl);
          setLoading(false);
        }
      });
    return () => {
      setLoading(true);
    };
  }, [content]);

  if (loading) {
    return null;
  }

  return (
    <Comment__container>
      <Comment__avatar alt={capitalize(name)} src={imgUrl || "./img.png"} />
      <Comment__content>
        <h6>{name}</h6>
        <p>{comment}</p>
        <div>
          <span>{moment(timestamp).fromNow()}</span>
          {currentUid === id && <h5 onClick={onClick}>Delete</h5>}
        </div>
      </Comment__content>
    </Comment__container>
  );
}

export default Comment;
