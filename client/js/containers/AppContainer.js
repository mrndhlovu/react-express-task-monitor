import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getCurrentUser } from "../actions/AuthActions";
import MainContainer from "./MainContainer";

class AppContainer extends Component {
  componentDidMount() {
    const { pathname } = this.props.location;
    const authPage = pathname === "/login" || pathname === "/signup";

    !authPage && this.props.getCurrentUser();
  }

  render() {
    return <MainContainer>{this.props.children}</MainContainer>;
  }
}

export default connect(null, { getCurrentUser })(withRouter(AppContainer));
