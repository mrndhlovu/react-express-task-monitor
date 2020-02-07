import React from "react";
import styled from "styled-components";

import NavButton from "../navBar/NavButton";

const StyledDiv = styled.div`
  justify-self: end;
  padding-right: 7px;
`;

const RightBoardButtons = ({ handleShowMenuClick }) => {
  return (
    <StyledDiv>
      <NavButton buttonText="Butler" />
      <NavButton
        iconName="ellipsis horizontal"
        buttonText="Show Menu"
        redirect={() => handleShowMenuClick()}
      />
    </StyledDiv>
  );
};

export default RightBoardButtons;
