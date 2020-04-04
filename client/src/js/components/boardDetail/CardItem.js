import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { BoardListsContext } from "../../utils/contextUtils";
import CardBadge from "../sharedComponents/CardBadge";
import CardCover from "../cardDetail/CardCover";
import EditCardPenIcon from "./EditCardPenIcon";
import LabelsSnippets from "./LabelsSnippets";

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

const ContentWrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  max-width: 244px;
  position: relative;
`;

const Container = styled.div`
  padding: 5px;
`;

const CardBadges = styled.div`
  padding: 2px 10px;
  display: flex;
`;

const CardItem = ({ card, sourceListId, sourceTitle }) => {
  const { backendUpdate, handleCardClick, updateBoard, board } = useContext(
    BoardListsContext
  );
  const hasLabel = card.labels.length !== 0;
  const hasAttachments =
    card.attachments.images.length !== 0 ||
    card.attachments.documents.length !== 0;
  const hasChecklist = card.checklists.length !== 0;
  const hasDescription = card.shortDescription.localeCompare("") !== 0;
  const hasComments = card.comments.length !== 0;
  const hasDueDate = card.dueDate;

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
    <ContentWrapper
      onMouseEnter={() => setShowEditButton(!showEditButton)}
      onMouseLeave={() => setShowEditButton(!showEditButton)}
      onClick={() => handleCardClick(card, sourceListId, sourceTitle)}
    >
      {hasLabel && <LabelsSnippets labels={card.labels} />}
      <Container>
        <CardCover card={card} />
        <CardTitle edit={showEditButton} title={card.title} />
      </Container>
      <CardBadges>
        {hasAttachments && <CardBadge icon="attach" />}
        {hasChecklist && <CardBadge icon="check square outline" />}
        {hasComments && (
          <CardBadge icon="comment outline" content={card.comments.length} />
        )}
        {hasDescription && <CardBadge icon="list" />}
        {hasDueDate && <CardBadge icon="clock outline" />}
      </CardBadges>

      <EditCardPenIcon
        handleDeleteCard={() => setDeleting(true)}
        showEditButton={showEditButton}
      />
    </ContentWrapper>
  );
};

export default withRouter(CardItem);
