import React from "react";
import styled from "styled-components";

import BoardsSummary from "./BoardsSummary";
import HomeSideMenu from "./HomeSideMenu";
import UIWrapper from "../sharedComponents/UIWrapper";

const StyledContainer = styled.div`
  font-family: roboto, sans-serif;
  margin: 0 10px;
  height: 97vh;
  overflow-y: auto;
`;

const HomePage = ({ history, user }) => {
  return (
    <StyledContainer className="boards-container">
      <UIWrapper className="boards-grid-wrap">
        <UIWrapper className="boards-grid">
          <HomeSideMenu history={history} className="sidebar-wrap" />
          <BoardsSummary user={user} />
        </UIWrapper>
      </UIWrapper>
    </StyledContainer>
  );
};

export default HomePage;
