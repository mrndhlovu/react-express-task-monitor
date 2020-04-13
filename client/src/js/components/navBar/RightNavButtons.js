import React, { useContext } from "react";
import styled from "styled-components";

import { MainContext } from "../../utils/contextUtils";
import NavButton from "../sharedComponents/NavButton";
import NavUserAvatar from "../sharedComponents/NavUserAvatar";

const StyledDiv = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const RightNavButtons = () => {
  const { auth } = useContext(MainContext);

  return (
    <StyledDiv>
      <NavButton iconName="bell" />
      {auth.user && <NavUserAvatar auth={auth} />}
    </StyledDiv>
  );
};

export default RightNavButtons;
