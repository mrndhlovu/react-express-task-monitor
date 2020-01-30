import React from "react";
import styled from "styled-components";

import { Header } from "semantic-ui-react";
import NavButton from "../navBar/NavButton";

const StyledDiv = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 15% 85%;
`;

const ButtonWrapper = styled.div`
  justify-self: start;
`;

export default function LeftBoardButtons({ boardTitle }) {
  return (
    <StyledDiv>
      <ButtonWrapper>
        <Header content={boardTitle} />
      </ButtonWrapper>
      <div>
        <NavButton iconName="star" />
        <NavButton buttonText="Personal" />
        <NavButton iconName="lock" buttonText="private" />
        <NavButton buttonText="Invite" />
      </div>
    </StyledDiv>
  );
}
