import React, { useState, FunctionComponent, useEffect } from "react";
import { AuthStateContext } from "./AuthContext";

import { auth } from "../firebase";

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

const onAuthStateChange = (
  setState: React.Dispatch<
    React.SetStateAction<{
      isAuthenticated: boolean;
    }>
  >
) => {
  return auth.onAuthStateChanged((user) => {
    if (user) {
      setState({ ...getUserInfo(user), isAuthenticated: true });
    } else {
      setState({ isAuthenticated: false });
    }
  });
};

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState({ isAuthenticated: false });

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthStateContext.Provider value={user}>
      {children}
    </AuthStateContext.Provider>
  );
};
