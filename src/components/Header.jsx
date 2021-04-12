import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { mixin, breakpoint } from "../styles/mixin";
import Avatar from "./Avatar";
import EmojiFoodBeverageIcon from "@material-ui/icons/EmojiFoodBeverage";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../utils/userSlice";
import { auth } from "../app/firebase";
const Header__container = styled.div`
  color: ${theme.color.secondary1};
  background: ${theme.color.primary1};
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 200;
  .Header__content {
    ${mixin.maxWidth};
    ${mixin.flexBetween}
    height: 6rem;
    padding: 0 1.5rem;
    a {
      font-size: 2.2rem;
      font-weight: 700;
    }
  }
  .Header__menu {
    cursor: pointer;
    position: relative;
  }
`;

const Styled__menu = styled(Menu)`
  .MuiPopover-paper {
    top: 6rem !important;
    width: fit-content !important;
    ul {
      li {
        font-size: 1.4rem;
        color: ${theme.color.primary1};
      }
    }
  }
`;

const Header__icon = styled(EmojiFoodBeverageIcon)`
  &&& {
    font-size: 2.8rem;
  }
`;

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutOfApp = () => {
    handleClose();
    auth.signOut();
    dispatch(logout());
  };
  return (
    <Header__container>
      <div className="Header__content">
        <Link to="/">
          <Header__icon />
        </Link>
        <Link to="/">Sippin&apos;</Link>
        <div className="Header__menu">
          <Avatar size="4rem" fontSize="1.8rem" onClick={handleClick} />
          <Styled__menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/">View Profile</Link>
            </MenuItem>
            <MenuItem onClick={logoutOfApp}>Log Out</MenuItem>
          </Styled__menu>
        </div>
      </div>
    </Header__container>
  );
}
