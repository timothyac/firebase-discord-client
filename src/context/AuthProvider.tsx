import React, { useState, FunctionComponent } from "react";
import { AuthStateContext, AuthFunctionContext } from "./AuthContext";

export const AuthProvider: FunctionComponent<any> = ({
  children,
  tokensValid,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(tokensValid);

  return (
    <AuthStateContext.Provider value={isAuthenticated}>
      <AuthFunctionContext.Provider value={setIsAuthenticated}>
        {children}
      </AuthFunctionContext.Provider>
    </AuthStateContext.Provider>
  );
};
