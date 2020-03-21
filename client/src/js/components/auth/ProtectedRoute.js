import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";
import { AppContext } from "../../utils/contextUtils";

const ProtectedRoute = ({ component: Component, location, ...rest }) => {
  const {
    auth: { loading, authenticated },
    auth
  } = useContext(AppContext);
  return (
    <Route
      {...rest}
      render={props => {
        return loading ? (
          <UILoadingSpinner />
        ) : authenticated ? (
          <Component key={location.pathname} auth={auth} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
