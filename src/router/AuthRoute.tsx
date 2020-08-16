import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthStateContext } from "../context/AuthContext";
import Navbar from "../components/system/Navbar";

const AuthRoute: React.FunctionComponent<any> = ({ component: C, ...rest }) => {
  const auth = useContext(AuthStateContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        auth?.isAuthenticated ? (
          <>
            <Navbar />
            <C props={props} />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default AuthRoute;
