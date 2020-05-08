import React from "react";
import styled from "styled-components";

import { Header } from "semantic-ui-react";
import AddAttachment from "./AddAttachment";
import AddCardCheckList from "./AddCardCheckList";
import AddCardDueDate from "./AddCardDueDate";
import AddCardLabel from "./AddCardLabel";
import AddCardMembers from "./AddCardMembers";
import AddCover from "./AddCover";
import CopyCardAction from "./CopyCardAction";
import MoveCardAction from "./MoveCardAction";

const StyledHeader = styled(Header)`
  font-size: 14px !important;
  color: #767676 !important;
`;

const Container = styled.section`
  margin-left: 2px;
  margin-right: 5px;
`;

const CardModalSidebar = ({ hasDueDate, hasCover, ...props }) => {
  return (
    <Container>
      <StyledHeader content="ADD TO CARD" />
      <AddCardMembers {...props} />
      <AddCardLabel {...props} />
      <AddCardCheckList {...props} />
      {!hasDueDate && <AddCardDueDate {...props} />}
      {<AddAttachment {...props} />}
      {!hasCover && <AddCover upward={false} {...props} />}
      <StyledHeader content="ACTIONS" />
      <MoveCardAction {...props} />
      <CopyCardAction {...props} />
    </Container>
  );
};

export default CardModalSidebar;
