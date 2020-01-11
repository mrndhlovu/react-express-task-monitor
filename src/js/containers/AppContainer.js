import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { getAuth } from "../actions/AuthActions";
import NavHeader from "../components/NavHeader";

const StyledAppContainer = styled.div`
  padding-left: 10px;
  background-color: ${props =>
    props.backgroundColor && `${props.backgroundColor}`};
  height: 100vh;
`;

class AppContainer extends Component {
  componentDidMount() {
    this.props.getAuth();
  }

  render() {
    const backgroundColor = "grey";
    return (
      <StyledAppContainer backgroundColor={backgroundColor}>
        <NavHeader />
        {this.props.children}
      </StyledAppContainer>
    );
  }
}

export default connect(null, { getAuth })(AppContainer);
