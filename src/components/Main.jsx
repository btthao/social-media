import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { mixin, breakpoint } from "../styles/mixin";
import UserInfo from "./UserInfo";
import Feed from "./Feed";

const Main__container = styled.div`
  ${mixin.maxWidth}
  padding: 3rem 0;
  padding-top: 9rem;
  display: grid;
  grid-template-columns: 1fr 0.5fr;
  grid-gap: 2.5rem;
  overflow: scroll;
`;

function Main() {
  return (
    <Main__container>
      <Feed />
      <UserInfo />
    </Main__container>
  );
}

export default Main;
