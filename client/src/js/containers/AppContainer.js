import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getAuth } from "../selectors/authSelectors";
import { getUserInfo } from "../actions/AuthActions";
import MainContainer from "./MainContainer";

class AppContainer extends Component {
  componentDidMount() {
    const { pathname } = this.props.location;
    const authPage = pathname === "/login" || pathname === "/signup";

    !authPage && this.props.getUserInfo();
  }

  render() {
    return (
      <MainContainer auth={this.props.auth}>
        {this.props.children}
      </MainContainer>
    );
  }
}

const mapStateToProps = (state) => ({ auth: getAuth(state) });

export default connect(mapStateToProps, { getUserInfo })(
  withRouter(AppContainer)
);
