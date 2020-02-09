import React, { useContext } from "react";
import styled from "styled-components";

import NavButton from "../navBar/NavButton";
import { BoardContext } from "../../utils/contextUtils";

const StyledDiv = styled.div`
  justify-self: ${props => (props.mobile ? "center" : "start")};
  padding-bottom: 5px;
`;

export default function LeftBoardButtons({ mobile, color, id }) {
  const { handleBoardStarClick } = useContext(BoardContext);

  return (
    <StyledDiv mobile={mobile}>
      <NavButton
        iconName="star outline"
        color={color && "yellow"}
        redirect={() => handleBoardStarClick(id)}
      />
      <NavButton buttonText="Personal" forceText={true} />
      <NavButton iconName="lock" buttonText="Private" forceText={true} />
      <NavButton buttonText="Invite" forceText={true} />
    </StyledDiv>
  );
}
