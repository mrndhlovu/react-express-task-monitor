import React, { useContext } from "react";
import styled from "styled-components";

import { AppContext } from "../../utils/contextUtils";
import NavButton from "../sharedComponents/NavButton";
import UserAvatar from "../sharedComponents/UserAvatar";

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

      <UserAvatar />
    </StyledDiv>
  );
};

export default RightNavButtons;
