import React from "react";
import styled from "styled-components";

import HomeSidebarButton from "../sharedComponents/HomeSidebarButton";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const HomeSideBar = () => {
  return (
    <StyledContainer>
      <HomeSidebarButton buttonText="Boards" iconName="trello" />
      <HomeSidebarButton
        buttonText="Templates"
        iconName="object ungroup outline"
      />
    </StyledContainer>
  );
};

export default HomeSideBar;
