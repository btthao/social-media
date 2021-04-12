import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { mixin, breakpoint } from "../styles/mixin";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { selectUser } from "../utils/userSlice";
import CreateIcon from "@material-ui/icons/Create";
import { changeDesc } from "../utils/User";
import { db } from "../app/firebase";
import moment from "moment";

const UserInfo__container = styled.div`
  ${mixin.borderR}
  width: 100%;
  background: ${theme.color.primary3};
  background: linear-gradient(
    250deg,
    ${theme.color.primary3},
    ${theme.color.primary1}
  );
  border: 0.1rem solid ${theme.color.secondary3};
  height: fit-content;
  display: grid;
  grid-template-rows: 1fr 3fr;
  overflow: hidden;
  position: relative;
  z-index: 1;
  min-width: 24rem;
  padding-bottom: 1rem;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 200%;
    height: 100%;
    transform: translate(-50%, 23%);
    background-color: ${theme.color.secondary1};
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    z-index: 2;
  }
`;

const UserInfo__img = styled.div`
  width: 100%;
  height: 100%;
  ${mixin.borderR}
  position: relative;
  z-index: 10;
  background: transparent;
`;

const UserInfo__avatar = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const UserInfo__stat = styled.div`
  z-index: 10;
  padding: 4rem 0.4rem 0;
  text-align: center;
  word-break: break-all;
  h6 {
    font-size: 1.7rem;
    font-weight: 600;
    word-break: break-word;
    margin-bottom: 0.3rem;
    color: ${theme.color.primary1};
  }
  p {
    font-size: 1.3rem;
    padding-bottom: 1rem;
  }
  .stat {
    border-top: 0.1rem solid ${theme.color.secondary3};
    padding: 0 0.7rem;
    padding-top: 1.2rem;
    div {
      ${mixin.flexBetween}
      p {
        margin: 0;
        font-size: 1.4rem;
        &:first-child {
          font-weight: 600;
        }
        &:last-child {
          color: ${theme.color.primary3};
        }
      }
    }
  }
`;

const UserInfo__desc = styled.div`
  ${mixin.transition}
  div:first-child {
    cursor: pointer;
    margin-bottom: 0.5rem;
    padding: 0 1.3rem;
    h6 {
      font-size: 1.4rem;
      font-weight: 500;
      .MuiSvgIcon-root {
        font-size: 1.3rem;
      }
    }
    &:hover {
      h6 {
        color: ${theme.color.primary3};
      }
    }
  }
`;

const UserInfo__input = styled.form`
  margin-bottom: 0.8rem;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  input {
    border: 0.1rem solid ${theme.color.secondary3};
    border-radius: 0.6rem;
    height: 2.3rem;
  }
  button {
    background: none;
    margin-left: 0.3rem;
    color: ${theme.color.primary1};
    cursor: pointer;
  }
`;

function UserInfo() {
  const name = useSelector(selectUser).name;
  const id = useSelector(selectUser).id;
  const email = useSelector(selectUser).email;
  const dateJoined = useSelector(selectUser).dateJoined.slice(5, 16);
  const [description, setDescription] = useState("");
  const [descInput, setDescInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    db.collection("users")
      .doc(id)
      .onSnapshot((doc) => {
        setDescription(doc.data().description);
        setTotalPosts(doc.data().posts);
      });
  }, []);

  const updateDesc = (e) => {
    e.preventDefault();
    if (descInput) {
      changeDesc({
        id,
        desc: descInput,
      });
      setDescInput("");
      setShowInput(false);
    }
  };

  return (
    <UserInfo__container>
      <UserInfo__img>
        <UserInfo__avatar>
          <Avatar size="6rem" fontSize="2.8rem" />
        </UserInfo__avatar>
      </UserInfo__img>
      <UserInfo__stat>
        <h6>{name}</h6>
        <p>{email}</p>
        <UserInfo__desc>
          <div onClick={() => setShowInput(!showInput)}>
            <h6>
              {description || "Add Bio"} <CreateIcon />
            </h6>
          </div>
          <UserInfo__input show={showInput}>
            <input
              type="text"
              value={descInput}
              maxLength="50"
              onChange={(e) => setDescInput(e.target.value)}
            />
            <button type="submit" onClick={updateDesc}>
              Save
            </button>
          </UserInfo__input>
        </UserInfo__desc>
        <div className="stat">
          <div>
            <p>Date joined</p>
            <p>{moment(dateJoined, "DD MMM YYYY").format("DD/MM/YY")}</p>
          </div>
          <div>
            <p>Total posts</p>
            <p>{totalPosts}</p>
          </div>
        </div>
      </UserInfo__stat>
    </UserInfo__container>
  );
}

export default UserInfo;
