import React, { Component } from "react";
import { connect } from "react-redux";

import { getAuth } from "../selectors/authSelectors";
import { getUserInfo } from "../actions/AuthActions";
import MainContainer from "./MainContainer";

class AppContainer extends Component {
  componentDidMount() {
    this.props.getUserInfo();
  }

  render() {
    return (
      <MainContainer auth={this.props.auth}>
        {this.props.children}
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({ auth: getAuth(state) });

export default connect(mapStateToProps, { getUserInfo })(AppContainer);
