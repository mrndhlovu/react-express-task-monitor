import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuth } from "../../utils/hookUtils";
import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";

const ProtectedRoute = ({ component: Component, location, ...rest }) => {
  const { auth } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isLoading ? (
          <UILoadingSpinner />
        ) : auth.authenticated ? (
          <Component key={location.pathname} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
