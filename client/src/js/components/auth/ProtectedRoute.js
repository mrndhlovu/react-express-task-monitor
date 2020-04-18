import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";
import { MainContext } from "../../utils/contextUtils";

const ProtectedRoute = ({ component: Component, location, ...rest }) => {
  const { auth } = useContext(MainContext);
  const { loading } = auth;
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
        } else if (loading) return <UILoadingSpinner />;

        return <Component key={location.pathname} auth={auth} {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
