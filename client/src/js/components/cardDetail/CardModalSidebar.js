import React from "react";
import styled from "styled-components";

import { Header, Divider } from "semantic-ui-react";
import AddAttachment from "./AddAttachment";
import AddCardCheckList from "./AddCardCheckList";
import AddCardDueDate from "./AddCardDueDate";
import AddCardLabel from "./AddCardLabel";
import AddCardMembers from "./AddCardMembers";
import CopyCardAction from "./CopyCardAction";
import MoveCardAction from "./MoveCardAction";

const StyledHeader = styled(Header)`
  font-size: 14px !important;
  color: #767676 !important;
`;

const Container = styled.div`
  margin: 10px;
`;

const CardModalSidebar = ({ addCardAttachment }) => {
  return (
    <Container>
      <StyledHeader content="ADD TO CARD" />
      <AddCardMembers />
      <AddCardLabel />
      <AddCardCheckList />
      <AddCardDueDate />
      <AddAttachment addCardAttachment={addCardAttachment} />
      <Divider />
      <StyledHeader content="ACTIONS" />
      <MoveCardAction />
      <CopyCardAction />
    </Container>
  );
};

export default CardModalSidebar;
