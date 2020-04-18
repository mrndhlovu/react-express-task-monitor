"use es6";

import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";

import HomePageContainer from "./containers/HomePageContainer";
import BoardContainer from "./containers/BoardContainer";
import SignupContainer from "./containers/SignupContainer";
import LoginContainer from "./containers/LoginContainer";
import ErrorPage from "./components/ErrorPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { MainContext } from "./utils/contextUtils";

export default function Routes() {
  const { auth } = useContext(MainContext);
  return (
    <Switch>
      <ProtectedRoute
        auth={auth}
        key="/"
        exact
        path="/"
        component={HomePageContainer}
      />
      <ProtectedRoute
        key="boardDetail"
        path="/boards/id/:id"
        component={BoardContainer}
        auth={auth}
      />

      <Route
        path="/login"
        render={(props) => <LoginContainer key="login" {...props} />}
      />
      <Route
        path="/signup"
        render={(props) => <SignupContainer key="signup" {...props} />}
      />
      <Route path="*" component={ErrorPage} />
    </Switch>
  );
}
