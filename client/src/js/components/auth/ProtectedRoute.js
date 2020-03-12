import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";
import { AppContext } from "../../utils/contextUtils";

const ProtectedRoute = ({ component: Component, location, ...rest }) => {
  const { authenticated, user, loading } = useContext(AppContext);
  const TOKEN = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={props => {
        if (!TOKEN && !authenticated) {
          return loading ? (
            <UILoadingSpinner />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        } else
          return <Component key={location.pathname} user={user} {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
