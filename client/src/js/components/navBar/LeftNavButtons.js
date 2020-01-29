import React from "react";
import styled from "styled-components";

import NavButton from "./NavButton";

const StyledDiv = styled.div`
  display: inline-block;
`;

const LeftNavButtons = ({ history }) => {
  return (
    <StyledDiv>
      <NavButton iconName="home" redirect={() => history.push("/")} />

      <NavButton
        size="tiny"
        redirect={() => history.push("/boards")}
        iconName="columns"
        buttonText="Boards"
      />
    </StyledDiv>
  );
};

export default LeftNavButtons;
