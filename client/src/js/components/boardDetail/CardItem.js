import React, { useState, useContext } from "react";
import styled from "styled-components";

import { BoardListsContext } from "../../utils/contextUtils";
import EditCardPenIcon from "./EditCardPenIcon";
import CardCover from "./CardCover";

const CardTitle = styled.div`
  color: #172b4d;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.8px;
  padding: 5px 10px;
  &:after {
    content: '${props => props.title}';
  }
`;

const Container = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  max-width: 244px;
  position: relative;
`;

const CardItem = ({ card, sourceListId, sourceTitle }) => {
  const [showEditButton, setShowEditButton] = useState(false);
  const {
    updateBoard,
    getSourceList,
    getFilteredBoard,
    handleCardClick
  } = useContext(BoardListsContext);

  const handleDeleteCard = () => {
    const newBoardLists = getFilteredBoard(sourceListId);
    const sourceList = getSourceList(sourceListId).shift();
    const newFilteredList = {
      ...sourceList,
      cards: sourceList.cards.filter(key => key.position !== card.position)
    };

    newBoardLists.lists.push(newFilteredList);
    newBoardLists.lists.sort((a, b) => a.position - b.position);

    updateBoard(newBoardLists);
  };

  return (
    <Container
      onMouseEnter={() => setShowEditButton(!showEditButton)}
      onMouseLeave={() => setShowEditButton(!showEditButton)}
      onClick={() => handleCardClick(card, sourceListId, sourceTitle)}
    >
      <CardCover card={card} />
      <CardTitle edit={showEditButton} title={card.title} />
      <EditCardPenIcon
        handleDeleteCard={handleDeleteCard}
        showEditButton={showEditButton}
      />
    </Container>
  );
};

export default CardItem;
