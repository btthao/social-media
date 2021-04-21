import React from "react";
import styled from "styled-components";
import { mixin, breakpoint } from "../styles/mixin";
import UserInfo from "./UserInfo";
import Feed from "./Feed";
import Notifications from "./Notifications";

const Main__container = styled.div`
  ${mixin.maxWidth}
  margin-top: 6rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  padding-left: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 0.5fr;
  grid-gap: 2.5rem;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  @media ${breakpoint.mobileL} {
    grid-template-columns: 1fr;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const Main__right = styled.div`
  width: 100%;
  min-width: 24rem;
  padding-right: 0.5rem;
  @media ${breakpoint.mobileL} {
    min-width: 28rem;
    grid-row: 1;
    padding-right: 0;
  }
`;

function Main() {
  return (
    <Main__container>
      <Feed />
      <Main__right>
        <UserInfo />
        <Notifications />
      </Main__right>
    </Main__container>
  );
}

export default Main;
