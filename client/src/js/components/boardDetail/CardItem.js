import React, { useState, useContext, useEffect, memo } from "react";
import styled from "styled-components";

import { BoardListsContext } from "../../utils/contextUtils";
import EditCardPenIcon from "./EditCardPenIcon";
import CardCover from "../cardDetail/CardCover";
import { requestDeleteCard } from "../../apis/apiRequests";
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

const CardItem = ({ card, sourceListId, sourceTitle, match }) => {
  const { id } = match.params;
  const { makeBoardUpdate, handleCardClick } = useContext(BoardListsContext);

  const [showEditButton, setShowEditButton] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!deleting) return;
    const deleteCard = async () =>
      await requestDeleteCard(
        { cardId: card.position, listId: sourceListId },
        id
      );
    deleteCard().then(res => makeBoardUpdate(res.data) && setDeleting(false));
  }, [card, deleting, id, sourceListId, makeBoardUpdate]);

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
