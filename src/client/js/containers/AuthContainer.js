import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getAuth } from "../selectors/authSelectors";
import { getCurrentUser } from "../actions/AuthActions";
import withAlert from "../HOC/withAlert";
import { UserContext } from "../utils/contextUtils";
import MainContainer from "./MainContainer";

class AuthContainer extends Component {
  componentDidMount() {
    this.authListener();
  }

  authListener() {
    this.props.getCurrentUser();
  }

  render() {
    const { auth } = this.props;

    return (
      <UserContext.Provider
        value={{ auth: { ...auth, authListener: () => this.authListener() } }}
      >
        <MainContainer>{this.props.children}</MainContainer>
      </UserContext.Provider>
    );
  }
}

const mapStateToProps = (state) => ({ auth: getAuth(state) });

export default connect(mapStateToProps, { getCurrentUser })(
  withRouter(withAlert(AuthContainer))
);
