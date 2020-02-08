import React, { useContext } from "react";
import styled from "styled-components";
import NavButton from "./NavButton";
import { Label } from "semantic-ui-react";
import { DimensionContext } from "../../utils/contextUtils";

const StyledDiv = styled.div`
  margin-right: 10px;
`;

const RightNavButtons = () => {
  const { mobile } = useContext(DimensionContext).device;
  return (
    <StyledDiv>
      <NavButton iconName="add" />

      {!mobile && <NavButton iconName="attention" />}

      <NavButton iconName="bell" />

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
  );
};

export default RightNavButtons;
