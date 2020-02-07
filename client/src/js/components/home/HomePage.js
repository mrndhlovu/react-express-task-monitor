import React from "react";
import styled from "styled-components";

import { Container } from "semantic-ui-react";

import BoardsSummary from "./BoardsSummary";
import HomeSideBar from "./HomeSideBar";

const StyledContainer = styled(Container)`
  height: 100vh;
  margin-top: 40px;
  padding-left: 5px;
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
