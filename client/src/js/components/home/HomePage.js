import React, { useContext } from "react";
import styled from "styled-components";

import { Container } from "semantic-ui-react";

import BoardsSummary from "./BoardsSummary";
import HomeSideBar from "./HomeSideBar";
import { AppContext } from "../../utils/contextUtils";

const StyledContainer = styled(Container)`
  height: 100vh;
  margin-top: 45px;
  margin-bottom: 40px;
  padding-left: 5px;
  font-family: roboto, sans-serif;
`;

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: ${props => (props.mobile ? "100%" : "20% 80%")};
  margin-top: 6%;
`;

const HomePage = () => {
  const { mobile } = useContext(AppContext).device;
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
