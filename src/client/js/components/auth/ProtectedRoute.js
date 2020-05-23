import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuth } from "../../utils/hookUtils";

const ProtectedRoute = ({ component: Component, location, ...rest }) => {
  const { auth } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.authenticated) {
          return <Component key={location.pathname} {...props} />;
        } else
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
      }}
    />
  );
};

export default ProtectedRoute;
