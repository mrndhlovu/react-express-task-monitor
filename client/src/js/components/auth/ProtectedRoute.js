import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";
import { AppContext } from "../../utils/contextUtils";

const ProtectedRoute = ({ component: Component, location, ...rest }) => {
  const { auth } = useContext(AppContext);

  return (
    <Route
      {...rest}
      render={props => {
        if (!auth.authenticated && auth.loading) {
          return auth.loading ? (
            <UILoadingSpinner />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        } else if (auth.authenticated)
          return <Component key={location.pathname} auth={auth} {...props} />;
        else return;
      }}
    />
  );
};

export default ProtectedRoute;
