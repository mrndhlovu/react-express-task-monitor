import React, { useContext } from "react";
import styled from "styled-components";

import { AppContext } from "../../utils/contextUtils";
import NavButton from "../sharedComponents/NavButton";
import UserLabel from "../sharedComponents/UserLabel";

const StyledDiv = styled.div`
  margin-right: 10px;
`;

const RightNavButtons = () => {
  const { mobile } = useContext(AppContext).device;
  return (
    <StyledDiv>
      <NavButton iconName="add" />

      {!mobile && <NavButton iconName="attention" />}

      <NavButton iconName="bell" />

      <UserLabel />
    </StyledDiv>
  );
};

export default RightNavButtons;
