import React, { FunctionComponent } from "react";
import { AuthStateContext } from "./AuthContext";

export const AuthProvider: FunctionComponent<any> = ({ children, auth }) => {
  return (
    <AuthStateContext.Provider value={auth}>
      {children}
    </AuthStateContext.Provider>
  );
};
