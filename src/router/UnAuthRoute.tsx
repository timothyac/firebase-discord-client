import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthStateContext } from "../context/AuthContext";
import Navbar from "../components/system/Navbar";

const UnAuthRoute: React.FunctionComponent<any> = ({
  component: C,
  ...rest
}) => {
  const isAuthenticated = useContext(AuthStateContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <>
            <Navbar />
            <C props={props} />
          </>
        ) : (
          <Redirect to="/dashboard" />
        )
      }
    />
  );
};

export default UnAuthRoute;
