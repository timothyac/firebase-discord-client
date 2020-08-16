import React from "react";
import { Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

import AuthRoute from "./AuthRoute";
import NoAuthRoute from "./NoAuthRoute";
import UnAuthRoute from "./UnAuthRoute";

const Routes = () => {
  return (
    <Switch>
      <UnAuthRoute path="/signup" component={Signup} />
      <UnAuthRoute path="/login" component={Login} />
      <AuthRoute path="/dashboard" component={Dashboard} />
      <NoAuthRoute path="/" component={Home} />
    </Switch>
  );
};

export default Routes;
