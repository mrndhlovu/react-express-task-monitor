import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuth } from "../../utils/hookUtils";
import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";

const ProtectedRoute = ({ component: ComposedComponent, ...rest }) => {
  const { auth, isLoading } = useAuth();

  const via = rest.location.pathname.slice(1).split("/")[0];

  class Authentication extends Component {
    handleRender = (props) => {
      if (!auth.authenticated) {
        if (isLoading) return <UILoadingSpinner />;
        return (
          <Redirect
            to={{
              pathname: `/login`,
              state: { from: props.location, via: via },
            }}
          />
        );
      } else
        return <ComposedComponent key={props.location.pathname} {...props} />;
    };

    render() {
      const { handleRender } = this;
      return <Route {...rest} render={handleRender} />;
    }
  }

  return <Authentication />;
};

export default ProtectedRoute;
