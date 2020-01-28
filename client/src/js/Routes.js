"use es6";

import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePageContainer from "./containers/HomePageContainer";
import BoardContainer from "./containers/BoardContainer";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" exact={true} component={HomePageContainer} />
      <Route path="/board/:id" exact={true} component={BoardContainer} />
    </Switch>
  );
}
