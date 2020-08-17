import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./router/Routes";
import { AuthProvider } from "./context/AuthProvider";
import { auth } from "./firebase";

const AppStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

// Get user props from firebase
const getUserInfo = (user: any) => {
  return {
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber,
    photoURL: user.photoURL,
    uid: user.uid,
  };
};

const App = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({ ...getUserInfo(user), isAuthenticated: true });
      } else {
        setUser({ isAuthenticated: false });
      }

      setIsAuthenticating(false);
    });
  }, []);

  return (
    <>
      {!isAuthenticating && (
        <AppStyled>
          <AuthProvider auth={user}>
            <Router>
              <Routes />
            </Router>
          </AuthProvider>
        </AppStyled>
      )}
    </>
  );
};

export default App;
