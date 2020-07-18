import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { useAuth } from "../../utils/hookUtils";
import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";

const ProtectedRoute = ({ component: ComposedComponent, ...rest }) => {
  const { auth } = useAuth();

  class Authentication extends Component {
    handleRender = (props) => {
      if (this.props.isLoading) return <UILoadingSpinner />;
      if (!this.props.auth.authenticated) return <Redirect to="/login" />;
      else
        return <ComposedComponent key={props.location.pathname} {...props} />;
    };

    render() {
      return <Route {...rest} render={this.handleRender} />;
    }
  }

  return <Authentication auth={{ ...auth }} />;
};

ProtectedRoute.propTypes = {
  auth: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired,
    authListener: PropTypes.func,
  }),
};

export default ProtectedRoute;
