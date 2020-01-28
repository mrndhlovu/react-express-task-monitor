import React from "react";

import { Container } from "semantic-ui-react";

import styled from "styled-components";
import BoardsSummary from "./BoardsSummary";
import HomeSideBar from "./HomeSideBar";

const StyledContainer = styled(Container)`
  height: 100vh;
  background-color: grey;
  padding-top: 20px;
  boarder-radius: 10px !important;
`;

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
`;

const HomePage = () => (
  <StyledContainer>
    <StyledWrapper>
      <HomeSideBar />
      <BoardsSummary />
    </StyledWrapper>
  </StyledContainer>
);

export default HomePage;
