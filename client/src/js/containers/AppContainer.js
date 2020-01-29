import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { getAuth } from "../actions/AuthActions";
import NavHeader from "../components/navBar/NavHeader";

const Container = styled.div`
  background-color: ${props => props.bgColor};
  height: 100vh;
`;

class AppContainer extends Component {
  componentDidMount() {
    this.props.getAuth();
  }

  render() {
    const bgColor = "#828c90";
    return (
      <Container bgColor={bgColor}>
        <NavHeader />
        {this.props.children}
      </Container>
    );
  }
}

export default connect(null, { getAuth })(AppContainer);
