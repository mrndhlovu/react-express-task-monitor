import React from "react";
import styled from "styled-components";

import NavButton from "../sharedComponents/NavButton";
import NavUserAvatar from "../sharedComponents/NavUserAvatar";

const StyledDiv = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const RightNavButtons = ({ user }) => {
  return (
    <StyledDiv>
      <NavButton iconName="bell" />
      <NavUserAvatar userName={user.fname} />
    </StyledDiv>
  );
};

export default RightNavButtons;
