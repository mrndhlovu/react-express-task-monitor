import React from "react";
import styled from "styled-components";

import NavButton from "../navBar/NavButton";

const StyledDiv = styled.div`
  padding-right: 4px;
  justify-self: ${props => (props.mobile ? "center" : "end")};
`;

const RightBoardButtons = ({ handleShowMenuClick, mobile }) => {
  return (
    <StyledDiv mobile={mobile}>
      <NavButton buttonText="Butler" forceText={true} />
      <NavButton
        iconName="ellipsis horizontal"
        buttonText="Show Menu"
        redirect={() => handleShowMenuClick()}
        forceText={true}
      />
    </StyledDiv>
  );
};

export default RightBoardButtons;
