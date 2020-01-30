import React from "react";
import styled from "styled-components";

import NavButton from "../navBar/NavButton";

const StyledDiv = styled.div`
  justify-items: last;
`;

const RightBoardButtons = () => {
  return (
    <StyledDiv>
      <NavButton buttonText="Butler" />
      <NavButton iconName="ellipsis horizontal" buttonText="Show Menu" />
    </StyledDiv>
  );
};

export default RightBoardButtons;
