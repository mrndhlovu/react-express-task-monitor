import React, { useState, useContext } from "react";
import styled from "styled-components";

import { BoardListsContext } from "../../utils/contextUtils";
import EditCardMenu from "./EditCardMenu";

const StyledCardDiv = styled.div`
  padding: 5px 10px;
  position: relative;
  display: grid;
  grid-template-columns: 90% 10%;
  align-items: center;
  color: #42526e;
`;

const StyledHeader = styled.div`
font-weight: 700;
font-size: 18px;

&:after{
  content: '${props => props.title}';
}
`;

const ImageContainer = styled.div`
  background-image: url(${props => props.cardImage});
  background-repeat: no-repeat;
  border-radius: 4px;
  cursor: pointer;
  background-size: 100% 100%;
  min-height: ${props => props.cardImage && "200px"};
  height: 100%;
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
    <ImageContainer
      cardImage={card.cardCover}
      onMouseEnter={() => setShowEditButton(!showEditButton)}
      onMouseLeave={() => setShowEditButton(!showEditButton)}
      onClick={() => handleCardClick(card, sourceListId, sourceTitle)}
    >
      <StyledCardDiv edit={showEditButton}>
        <StyledHeader title={card.title} />
        <EditCardMenu
          handleDeleteCard={handleDeleteCard}
          showEditButton={showEditButton}
        />
      </StyledCardDiv>
    </ImageContainer>
  );
};

export default CardItem;
