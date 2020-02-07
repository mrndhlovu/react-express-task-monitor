import React from "react";
import styled from "styled-components";
import NavButton from "./NavButton";
import { Label } from "semantic-ui-react";

const StyledDiv = styled.div`
  display: inline-block;
`;

const RightNavButtons = () => {
  return (
    <div>
      <StyledDiv>
        <StyledDiv>
          <NavButton iconName="add" />
        </StyledDiv>
        <StyledDiv>
          <NavButton iconName="attention" />
        </StyledDiv>
        <StyledDiv>
          <NavButton iconName="bell" />
        </StyledDiv>
        <StyledDiv>
          <Label
            as="a"
            circular
            size="large"
            color="purple"
            onClick={() => console.log("m")}
          >
            M
          </Label>
        </StyledDiv>
      </StyledDiv>
    </div>
  );
};

export default RightNavButtons;
