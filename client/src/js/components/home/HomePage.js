import React, { useContext } from "react";
import styled from "styled-components";

import { Container } from "semantic-ui-react";

import BoardsSummary from "./BoardsSummary";
import HomeSideBar from "./HomeSideBar";
import { DimensionContext } from "../../utils/contextUtils";

const StyledContainer = styled(Container)`
  height: 100vh;
  margin-top: 40px;
  padding-left: 5px;
`;

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: ${props => (props.mobile ? "100%" : "20% 80%")};
`;

const HomePage = () => {
  const { mobile } = useContext(DimensionContext).device;
  return (
    <StyledContainer>
      <StyledWrapper mobile={mobile}>
        {!mobile && <HomeSideBar />}
        <BoardsSummary />
      </StyledWrapper>
    </StyledContainer>
  );
};

export default HomePage;
