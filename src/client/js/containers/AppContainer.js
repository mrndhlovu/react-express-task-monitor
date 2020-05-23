import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getAuth } from "../selectors/authSelectors";
import { getCurrentUser } from "../actions/AuthActions";
import MainContainer from "./MainContainer";
import { stringsEqual } from "../utils/appUtils";
import withAlert from "../HOC/withAlert";

class AppContainer extends Component {
  componentDidMount() {
    const { pathname } = this.props.history.location;
    const isLoginPage = stringsEqual(pathname, "/login");
    const isSignupPage = stringsEqual(pathname, "/signup");

    if (!isLoginPage && !isSignupPage) this.props.getCurrentUser();
  }

  render() {
    const { auth } = this.props;
    return (
      <MainContainer auth={{ ...auth }}>{this.props.children}</MainContainer>
    );
  }
}

const mapStateToProps = (state) => ({ auth: getAuth(state) });

export default connect(mapStateToProps, { getCurrentUser })(
  withRouter(withAlert(AppContainer))
);
