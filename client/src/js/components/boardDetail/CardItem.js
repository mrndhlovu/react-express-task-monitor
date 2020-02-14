import React, { useState, useContext } from "react";
import styled from "styled-components";

import { AppContext } from "../../utils/contextUtils";
import EditCardMenu from "./EditCardMenu";

const StyledCardDiv = styled.div`
  cursor: pointer;
  margin: 10px 5px !important;
  padding: 0 10px;
  position: relative;
  border-radius: 4px;
  display: grid;
  grid-template-columns: 90% 10%;
  align-items: center;
  color: #42526e;
`;

const StyledHeader = styled.div``;

const Span = styled.span`
  font-size: 12px !important;
  font-weight: 600;
`;

const CardItem = ({ card, sourceListId }) => {
  const [showEditButton, setShowEditButton] = useState(false);
  const { updateBoard, getSourceList, getFilteredBoard } = useContext(
    AppContext
  );

  function handleDeleteCard() {
    const newBoardLists = getFilteredBoard(sourceListId);
    const sourceList = getSourceList(sourceListId).shift();

    const newFilteredList = {
      ...sourceList,
      cards: sourceList.cards.filter(key => key.position !== card.position)
    };

    newBoardLists.lists.push(newFilteredList);
    newBoardLists.lists.sort((a, b) => a.position - b.position);

    updateBoard(newBoardLists);
  }

  return (
    <StyledCardDiv
      edit={showEditButton}
      onMouseEnter={() => setShowEditButton(!showEditButton)}
      onMouseLeave={() => setShowEditButton(!showEditButton)}
    >
      <StyledHeader>
        <Span>{card.title}</Span>
      </StyledHeader>
      <EditCardMenu
        handleDeleteCard={handleDeleteCard}
        showEditButton={showEditButton}
      />
    </StyledCardDiv>
  );
};

export default CardItem;
