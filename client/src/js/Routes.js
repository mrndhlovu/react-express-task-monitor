"use es6";

import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePageContainer from "./containers/HomePageContainer";
import BoardContainer from "./containers/BoardContainer";
import SignupContainer from "./containers/SignupContainer";
import LoginContainer from "./containers/LoginContainer";
import ErrorPage from "./components/ErrorPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

export default function Routes() {
  return (
    <Switch>
      <ProtectedRoute exact path="/" component={HomePageContainer} />
      <ProtectedRoute path="/boards/id/:id" component={BoardContainer} />
      <Route path="/login" component={LoginContainer} />
      <Route path="/signup" component={SignupContainer} />
      <Route path="*" component={ErrorPage} />
    </Switch>
  );
}
