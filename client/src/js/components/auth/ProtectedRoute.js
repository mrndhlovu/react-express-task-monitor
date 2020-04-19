import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";
import { getAuth } from "../../selectors/authSelectors";

const ProtectedRoute = ({ component: Component, auth, location, ...rest }) => {
  const data = localStorage.getItem("user");
  const AUTH_ID = data && JSON.parse(data)._id;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.authenticated && !AUTH_ID) {
          return auth.isLoading ? (
            <UILoadingSpinner />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        } else
          return <Component key={location.pathname} auth={auth} {...props} />;
      }}
    />
  );
};
const mapStateToProps = (state) => ({
  auth: getAuth(state),
});
export default connect(mapStateToProps)(ProtectedRoute);
