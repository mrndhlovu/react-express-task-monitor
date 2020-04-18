import React from "react";
import { Route, Redirect } from "react-router-dom";

import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";

const ProtectedRoute = ({ component: Component, auth, location, ...rest }) => {
  const data = localStorage.getItem("user");
  const AUTH_ID = data && JSON.parse(data)._id;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.authenticated && !AUTH_ID) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        } else if (auth.authenticated)
          return <Component key={location.pathname} auth={auth} {...props} />;
        return <UILoadingSpinner />;
      }}
    />
  );
};

export default ProtectedRoute;
