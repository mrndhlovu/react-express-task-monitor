import React, { useState, useContext, useEffect, memo } from "react";
import styled from "styled-components";

import { BoardListsContext } from "../../utils/contextUtils";
import EditCardPenIcon from "./EditCardPenIcon";
import CardCover from "../cardDetail/CardCover";
import { withRouter } from "react-router-dom";

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
  const { backendUpdate, handleCardClick, updateBoard, board } = useContext(
    BoardListsContext
  );

  const [showEditButton, setShowEditButton] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!deleting) return;
    const deleteCard = async () => {
      const newBoard = {
        ...board,
        lists: board.lists.map(list =>
          list.position === sourceListId
            ? {
                ...list,
                cards: list.cards.filter(
                  item => item.position !== card.position
                )
              }
            : { ...list }
        )
      };

      updateBoard(newBoard, "deleteCard");
    };
    deleteCard();
    setDeleting(false);
  }, [card, deleting, sourceListId, backendUpdate, board, updateBoard]);

  return (
    <Container
      onMouseEnter={() => setShowEditButton(!showEditButton)}
      onMouseLeave={() => setShowEditButton(!showEditButton)}
      onClick={() => handleCardClick(card, sourceListId, sourceTitle)}
    >
      <CardCover card={card} />
      <CardTitle edit={showEditButton} title={card.title} />
      <EditCardPenIcon
        handleDeleteCard={() => setDeleting(true)}
        showEditButton={showEditButton}
      />
    </Container>
  );
};

export default withRouter(memo(CardItem));
