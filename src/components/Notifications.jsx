import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../app/firebase";
import { theme } from "../styles/theme";
import { mixin } from "../styles/mixin";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { useSelector } from "react-redux";
import { selectUser } from "../utils/userSlice";
import { Link } from "react-scroll";
import moment from "moment";

const Notifications__container = styled.div`
  margin-top: 2.5rem;
  width: 100%;
  ${mixin.borderR}
  max-height: 29rem;
  overflow: scroll;
  background: ${theme.color.secondary1};
  border: 0.1rem solid ${theme.color.secondary3};
  padding: 1.8rem 0.7rem;
  h4 {
    width: 100%;
    font-size: 1.6rem;
    font-weight: 500;
    color: ${theme.color.primary3};
    border-bottom: 0.1rem solid ${theme.color.secondary3};
    padding-bottom: 0.5rem;
    .icon {
      margin-left: 0.4rem;
      transform: translateY(0.2rem);
    }
  }
`;

const Notifications__main = styled.div`
  display: grid;
  margin-top: 0.3rem;
  h5 {
    font-size: 1.4rem;
    font-weight: 400;
    margin-top: 0.6rem;
  }
`;

const Notifications__noti = styled(Link)`
  padding: 1rem 0;
  cursor: pointer;
  display: flex;
  font-weight: 500;
  justify-content: space-between;
  h6 {
    font-weight: 400;
    margin-right: 0.7rem;
    font-weight: 500;
    font-size: 1.2rem;
  }
  span {
    font-size: 1.2rem;
    color: ${theme.color.primary5};
    min-width: fit-content;
  }
`;

function Notifications() {
  const id = useSelector(selectUser).id;
  const [notis, setNotis] = useState([]);
  useEffect(() => {
    db.collection("notifications")
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setNotis(doc.data().notifications.reverse());
        }
      });
  }, []);

  return (
    <Notifications__container>
      <h4>
        Latest Notifications
        <NotificationsIcon className="icon" />
      </h4>
      <Notifications__main>
        {notis.length == 0 ? (
          <h5>You have no notifications :/</h5>
        ) : (
          notis.map((noti, index) => (
            <Notifications__noti to={noti.postId} key={index} offset={-80}>
              <h6>
                {noti.sender}{" "}
                {noti.type === "like"
                  ? "likes your post"
                  : "comments on your post"}
              </h6>
              <span>{moment(noti.timestamp).fromNow()}</span>
            </Notifications__noti>
          ))
        )}
      </Notifications__main>
    </Notifications__container>
  );
}

export default Notifications;
