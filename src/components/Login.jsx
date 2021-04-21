import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { mixin } from "../styles/mixin";
import EmojiFoodBeverageIcon from "@material-ui/icons/EmojiFoodBeverage";
import Button from "./Button";
import Signup from "./Signup";
import { auth } from "../app/firebase";
import { login } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Login__container = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 60rem;
  min-width: 28rem;
  ${mixin.flexCenter}
  overflow: scroll;
  padding: 2rem;
`;

const Login__form = styled.form`
  width: 95%;
  max-width: 33rem;
  box-shadow: 14px 14px 18px ${theme.color.secondary3},
    -15px -15px 22px ${theme.color.secondary1};
  border-radius: 2rem;
  ${mixin.flexCenter}
  flex-direction: column;
  padding: 4rem 2.3rem;
  text-align: center;
  h1 {
    margin: 0.7rem auto 2rem;
    color: ${theme.color.primary1};
    font-size: 2.2rem;
    font-weight: 600;
  }
  p {
    margin-top: 1.2rem;
    font-size: 1.2rem;
    span {
      color: ${theme.color.primary3};
      font-weight: 700;
      cursor: pointer;
    }
  }
`;

const Login__icon = styled(EmojiFoodBeverageIcon)`
  &&& {
    font-size: 6rem;
    color: ${theme.color.primary1};
  }
`;

const Login__input = styled.input`
  margin-bottom: 1.5rem;
  width: 100%;
  font-size: 1.3rem;
  padding: 1.2rem 0.9rem;
  background: inherit;
  box-shadow: inset 7px 7px 12px #e8e8e8,
    inset -8px -8px 12px ${theme.color.secondary4};
  border-radius: 2rem;
  -webkit-appearance: none;
`;

function LogIn() {
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const loginToApp = (e) => {
    e.preventDefault();
    if (email && password) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userAuth) => {
          dispatch(
            login({
              name: userAuth.user.displayName,
              email: userAuth.user.email,
              id: userAuth.user.uid,
              dateJoined: userAuth.user.metadata.creationTime,
            })
          );
        })
        .catch((error) => alert(error.message));
    } else {
      alert("Please fill in all required fields!");
    }
  };
  const handleClose = () => {
    setShowSignup(false);
  };
  return (
    <Login__container>
      {showSignup ? (
        <Signup onClick={handleClose} />
      ) : (
        <Login__form>
          <Login__icon />
          <h1>Sippin&apos;</h1>
          <Login__input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
          />
          <Login__input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />
          <Button type="submit" onClick={loginToApp} text="Log In" />
          <p>
            Don&apos;t have an account?{" "}
            <span onClick={() => setShowSignup(true)}>Sign Up</span> now!
          </p>
        </Login__form>
      )}
    </Login__container>
  );
}

export default LogIn;
