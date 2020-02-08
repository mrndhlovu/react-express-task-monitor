import React from "react";
import styled from "styled-components";

import NavButton from "../navBar/NavButton";

const StyledDiv = styled.div`
  justify-self: ${props => (props.mobile ? "center" : "start")};
  padding-bottom: 5px;
`;

export default function LeftBoardButtons({ mobile }) {
  return (
    <StyledDiv mobile={mobile}>
      <NavButton iconName="star" />
      <NavButton buttonText="Personal" forceText={true} />
      <NavButton iconName="lock" buttonText="private" forceText={true} />
      <NavButton buttonText="Invite" forceText={true} />
    </StyledDiv>
  );
}
