import React from "react";
import { Route } from "react-router-dom";

import Navbar from "../components/system/Navbar";

const NoAuthRoute: React.FunctionComponent<any> = ({
  component: C,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Navbar />
          <C props={props} />
        </>
      )}
    />
  );
};

export default NoAuthRoute;
