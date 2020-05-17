import React from "react";
import styled from "styled-components";

import NavButton from "../sharedComponents/NavButton";
import NavUserAvatar from "../sharedComponents/NavUserAvatar";
import { useAuth } from "../../utils/hookUtils";

const StyledDiv = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const RightNavButtons = ({ history }) => {
  const { user } = useAuth();
  return (
    <StyledDiv>
      <NavButton iconName="bell" />
      <NavUserAvatar userName={user.fname} history={history} />
    </StyledDiv>
  );
};

export default RightNavButtons;
