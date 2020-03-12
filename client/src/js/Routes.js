"use es6";

import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePageContainer from "./containers/HomePageContainer";
import BoardContainer from "./containers/BoardContainer";
import SignupContainer from "./containers/SignupContainer";
import LoginContainer from "./containers/LoginContainer";
import ErrorPage from "./components/ErrorPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AppContainer from "./containers/AppContainer";

export default function Routes() {
  return (
    <AppContainer>
      <Switch>
        <ProtectedRoute key="/" exact path="/" component={HomePageContainer} />
        <ProtectedRoute
          key="boardDetail"
          path="/boards/id/:id"
          component={BoardContainer}
        />

        <Route
          path="/login"
          render={props => <LoginContainer key="login" {...props} />}
        />
        <Route
          path="/signup"
          render={props => <SignupContainer key="signup" {...props} />}
        />
        <Route path="*" component={ErrorPage} />
      </Switch>
    </AppContainer>
  );
}
