import React, { useContext } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { AppContext } from "../../utils/contextUtils";
import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";

const ProtectedRoute = ({ component: Component, history, ...rest }) => {
  const { auth, loading } = useContext(AppContext);
  const { authenticated, user } = auth;

  return (
    <Route
      {...rest}
      render={props => {
        if (!authenticated) {
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
        } else {
          return (
            <Component key={history.location.pathname} user={user} {...props} />
          );
        }
      }}
    />
  );
};

export default withRouter(ProtectedRoute);
