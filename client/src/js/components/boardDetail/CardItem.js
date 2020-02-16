import React, { useState, useContext } from "react";
import styled from "styled-components";

import { BoardListsContext } from "../../utils/contextUtils";
import EditCardMenu from "./EditCardMenu";

const StyledCardDiv = styled.div`
  cursor: pointer;
  padding: 5px 10px;
  position: relative;
  border-radius: 4px;
  display: grid;
  grid-template-columns: 90% 10%;
  align-items: center;
  color: #42526e;
`;

const StyledHeader = styled.div`

&:after{
  content: '${props => props.title}';
}

`;

const CardItem = ({ card, sourceListId, sourceTitle }) => {
  const [showEditButton, setShowEditButton] = useState(false);
  const {
    updateBoard,
    getSourceList,
    getFilteredBoard,
    handleCardClick
  } = useContext(BoardListsContext);
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
      onClick={() => handleCardClick(card, sourceListId, sourceTitle)}
    >
      <StyledHeader title={card.title} />
      <EditCardMenu
        handleDeleteCard={handleDeleteCard}
        showEditButton={showEditButton}
      />
    </StyledCardDiv>
  );
};

export default CardItem;
