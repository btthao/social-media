import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { mixin, breakpoint } from "../styles/mixin";
import Button from "./Button";
import { auth } from "../app/firebase";
import { useDispatch } from "react-redux";
import { login } from "../utils/userSlice";
import { newUser } from "../utils/User";
import CloseIcon from "@material-ui/icons/Close";
const Signup__form = styled.form`
  background: ${theme.color.secondary4};
  width: 95%;
  max-width: 34rem;
  ${mixin.flexCenter}
  flex-direction: column;
  padding: 4.5rem 2.2rem;
  border-radius: 1.6rem;
  position: relative;
  box-shadow: 8px 8px 18px ${theme.color.secondary3};
  h1 {
    font-size: 2rem;
    font-weight: 500;
    width: 100%;
    margin-bottom: 3rem;
    border-bottom: 0.1rem solid ${theme.color.secondary3};
    padding-bottom: 1rem;
    color: ${theme.color.primary1};
  }
`;

const Signup__input = styled.input`
  margin-bottom: 1.5rem;
  width: 100%;
  font-size: 1.3rem;
  padding: 1.1rem 0.8rem;
  background: inherit;
  border: 0.1rem solid ${theme.color.secondary3};
  border-radius: 0.7rem;
`;

const Signup__closeIcon = styled(CloseIcon)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: ${theme.color.primary1};
  font-size: 2.4rem !important;
  cursor: pointer;
`;

function Signup({ onClick }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            dispatch(
              login({
                name,
                email: userAuth.user.email,
                id: userAuth.user.uid,
                dateJoined: userAuth.user.metadata.creationTime,
              })
            );
          })
          .then(() => {
            //add to 'users' collection
            newUser({
              name,
              id: userAuth.user.uid,
            });
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <Signup__form>
      <h1>Create account!</h1>
      <Signup__closeIcon onClick={onClick} />
      <Signup__input
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Username"
        type="text"
      />
      <Signup__input
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
      />
      <Signup__input
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <Button type="submit" onClick={register} text="Join now!" />
    </Signup__form>
  );
}

export default Signup;
