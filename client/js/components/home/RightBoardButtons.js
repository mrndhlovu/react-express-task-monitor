import React from "react";
import styled from "styled-components";

import NavButton from "../sharedComponents/NavButton";

const StyledDiv = styled.div`
  padding-right: 4px;
  justify-self: ${props => (props.mobile ? "start" : "end")};
`;

const RightBoardButtons = ({ handleShowMenuClick, mobile }) => {
  return (
    <StyledDiv mobile={mobile}>
      <NavButton
        iconName="ellipsis horizontal"
        size="tiny"
        buttonText="Show Menu"
        redirect={() => handleShowMenuClick()}
        forceText={true}
      />
    </StyledDiv>
  );
};

export default RightBoardButtons;
