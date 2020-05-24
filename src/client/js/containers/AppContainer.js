import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getAuth } from "../selectors/authSelectors";
import { getCurrentUser } from "../actions/AuthActions";
import MainContainer from "./MainContainer";
import withAlert from "../HOC/withAlert";

class AppContainer extends Component {
  componentDidMount() {
    this.authListener();
  }

  authListener() {
    this.props.getCurrentUser();
  }

  render() {
    const { auth } = this.props;

    return (
      <MainContainer
        auth={{ ...auth, authListener: () => this.authListener() }}
      >
        {this.props.children}
      </MainContainer>
    );
  }
}

const mapStateToProps = (state) => ({ auth: getAuth(state) });

export default connect(mapStateToProps, { getCurrentUser })(
  withRouter(withAlert(AppContainer))
);
