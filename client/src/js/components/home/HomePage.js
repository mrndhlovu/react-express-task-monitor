import React, { useContext } from "react";
import styled from "styled-components";

import BoardsSummary from "./BoardsSummary";
import HomeSideMenu from "./HomeSideMenu";
import { MainContext } from "../../utils/contextUtils";

const StyledContainer = styled.div`
  font-family: roboto, sans-serif;
  margin: 0 10px;
  height: 97vh;
  overflow-y: auto;
`;

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.mobile || props.tablet ? "100%" : "20% 80%"};
  margin: ${(props) => (props.mobile || props.tablet ? "8% 0" : "3%  20%")};
`;

const HomePage = () => {
  const { mobile, tablet } = useContext(MainContext).device;
  return (
    <StyledContainer className="boards-container" mobile={mobile}>
      <StyledWrapper mobile={mobile} tablet={tablet}>
        {!mobile && !tablet && <HomeSideMenu />}
        <BoardsSummary />
      </StyledWrapper>
    </StyledContainer>
  );
};

export default HomePage;
