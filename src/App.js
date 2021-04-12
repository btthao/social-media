import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyle from "./styles/globalStyles";
import Header from "./components/Header";
import Main from "./components/Main";
import Login from "./components/Login";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./utils/userSlice";
import { login, logout } from "./utils/userSlice";
import { auth } from "./app/firebase";

function App() {
  const user = useSelector(selectUser).name;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            name: userAuth.displayName,
            email: userAuth.email,
            id: userAuth.uid,
            dateJoined: userAuth.metadata.creationTime,
          })
        );
        setLoading(false);
      } else {
        dispatch(logout());
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Router>
      <GlobalStyle />{" "}
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <Main />
        </>
      )}{" "}
    </Router>
  );
}

export default App;
