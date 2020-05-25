import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuth } from "../../utils/hookUtils";
import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";

const ProtectedRoute = ({ component: ComposedComponent, ...rest }) => {
  const { auth } = useAuth();

  class Authentication extends Component {
    handleRender = (props) => {
      if (this.props.isLoading) return <UILoadingSpinner />;
      if (!this.props.auth.authenticated) return <Redirect to="/login" />;
      else return <ComposedComponent {...props} />;
    };

    render() {
      return <Route {...rest} render={this.handleRender} />;
    }
  }

  return <Authentication auth={auth} />;
};

export default ProtectedRoute;
