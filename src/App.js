import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from "./styles/globalStyles";
import Header from "./components/Header";
import Main from "./components/Main";
import Login from "./components/Login";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./utils/userSlice";
import { login, logout } from "./utils/userSlice";
import { auth } from "./app/firebase";
import moment from "moment";

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
      } else {
        dispatch(logout());
      }
      setLoading(false);
    });
    moment.updateLocale("en", {
      relativeTime: {
        future: "in %s",
        past: "%s",
        s: "just now",
        ss: "%d s",
        m: "1m",
        mm: "%dm",
        h: "1h",
        hh: "%dh",
        d: "1d",
        dd: "%dd",
        w: "1w",
        ww: "%dw",
        M: "1m",
        MM: "%dm",
        y: "1y",
        yy: "%dy",
      },
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
