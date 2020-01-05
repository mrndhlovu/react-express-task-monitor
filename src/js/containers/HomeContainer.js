import React, { Component } from "react";
import styled from "styled-components";

import BoardsList from "../components/BoardsList";
import BoardColumns from "../components/BoardColumns";

const StyledDiv = styled.div`
  margin-top: 50px !important;
  padding-left: 20px !important;
  padding-right: 20px !important;
`;

class HomeContainer extends Component {
  render() {
    return (
      <StyledDiv>
        <BoardColumns />
      </StyledDiv>
    );
  }
}

export default HomeContainer;
