import React, { Component } from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import { getAuth } from "../actions/AuthActions";
import NavHeader from "../components/NavHeader";

const StyledAppContainer = styled.div`
  min-height: 60rem;
  overflow: hidden;
  padding-bottom: 2rem;
`;

class AppContainer extends Component {
  componentDidMount() {
    this.props.getAuth();
  }

  render() {
    return (
      <StyledAppContainer>
        <NavHeader />
        {this.props.children}
      </StyledAppContainer>
    );
  }
}

export default connect(null, { getAuth })(AppContainer);
