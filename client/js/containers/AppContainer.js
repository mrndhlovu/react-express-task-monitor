import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getAuth } from "../selectors/authSelectors";
import { getCurrentUser } from "../actions/AuthActions";
import { stringsEqual } from "../utils/appUtils";
import MainContainer from "./MainContainer";

class AppContainer extends Component {
  componentDidMount() {
    const { pathname } = this.props.location;
    const isProtectedRoute =
      pathname.split("/").includes("id") || stringsEqual(pathname, "/");

    isProtectedRoute && this.props.getCurrentUser();
  }

  render() {
    return (
      <MainContainer auth={{ ...this.props.auth }}>
        {this.props.children}
      </MainContainer>
    );
  }
}

const mapStateToProps = (state) => ({ auth: getAuth(state) });

export default connect(mapStateToProps, { getCurrentUser })(
  withRouter(AppContainer)
);
