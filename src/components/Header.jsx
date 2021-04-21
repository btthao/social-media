import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { mixin, breakpoint } from "../styles/mixin";
import EmojiFoodBeverageIcon from "@material-ui/icons/EmojiFoodBeverage";
import { useDispatch } from "react-redux";
import { logout } from "../utils/userSlice";
import { auth } from "../app/firebase";

const Header__container = styled.div`
  background: ${theme.color.secondary1};
  color: ${theme.color.primary1};
  border-bottom: 0.1rem solid ${theme.color.secondary4};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;
  z-index: 200;
  .Header__content {
    ${mixin.maxWidth};
    ${mixin.flexBetween}
    height: 100%;
    padding: 0 1.5rem;
    h1 {
      font-size: 2.2rem;
      font-weight: 700;
      @media ${breakpoint.mobileL} {
        font-size: 1.7rem;
      }
    }
  }
`;

const Header__icon = styled(EmojiFoodBeverageIcon)`
  &&& {
    font-size: 3.2rem;
  }
`;

const Header__button = styled.button`
  padding: 0 1rem;
  height: 3.3rem;
  background: ${theme.color.primary5};
  border-radius: 0.4rem;
  font-size: 1.3rem;
  cursor: pointer;
  font-weight: 500;
  @media ${breakpoint.mobileL} {
    font-size: 1rem;
    height: 2.8rem;
    padding: 0 0.5rem;
  }
`;

export default function Header() {
  const dispatch = useDispatch();
  const logoutOfApp = () => {
    auth.signOut();
    dispatch(logout());
  };
  return (
    <Header__container>
      <div className="Header__content">
        <h1>Sippin&apos;</h1>
        <Header__icon />
        <Header__button type="button" onClick={logoutOfApp}>
          LOG OUT
        </Header__button>
      </div>
    </Header__container>
  );
}
