import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { BoardListsContext } from "../../utils/contextUtils";
import { getFormattedDate } from "../../utils/appUtils";
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
  max-width: 256px;
  position: relative;
`;

const Container = styled.div`
  padding: 5px;
`;

const CardBadges = styled.div`
  padding: 2px 10px;
  display: flex;
`;

const CardItem = ({ card, sourceListId, sourceTitle, isLast }) => {
  const {
    handleBoardUpdate,
    handleCardClick,
    updateBoard,
    board,
    mobile
  } = useContext(BoardListsContext);
  const hasLabel = card.labels.length !== 0;
  const hasAttachments =
    card.attachments.images.length !== 0 ||
    card.attachments.documents.length !== 0;
  const hasChecklist = card.checklists.length !== 0;
  const hasDescription = card.shortDescription.localeCompare("") !== 0;
  const hasComments = card.comments.length !== 0;
  const hasDueDate = card.dueDate;

  const [showEditButton, setShowEditButton] = useState(false);
  const [deleteCard, setDeleteCard] = useState(false);

  useEffect(() => {
    if (!deleteCard) return;
    const deleteCardItem = async () => {
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
    deleteCardItem();
    setDeleteCard(false);
  }, [card, deleteCard, sourceListId, handleBoardUpdate, board, updateBoard]);

  return (
    <ContentWrapper
      onMouseEnter={() => setShowEditButton(!showEditButton)}
      onMouseLeave={() => setShowEditButton(!showEditButton)}
      onClick={() => handleCardClick(card, sourceListId, sourceTitle)}
    >
      <LabelsSnippets labels={card.labels} hasLabel={hasLabel} />
      <Container>
        <CardCover card={card} />
        <CardTitle edit={showEditButton} title={card.title} />
      </Container>
      <CardBadges>
        <CardBadge
          icon="attach"
          content={card.attachments.images.length}
          hasBadge={hasAttachments}
        />

        <CardBadge icon="check square outline" hasBadge={hasChecklist} />

        <CardBadge
          icon="comment outline"
          content={card.comments.length}
          hasBadge={hasComments}
        />

        <CardBadge icon="list" hasBadge={hasDescription} />

        <CardBadge
          icon="clock outline"
          content={getFormattedDate(card.dueDate.date, "LL")}
          hasBadge={hasDueDate}
        />
      </CardBadges>
      <EditCardPenIcon
        handleDeleteCard={() => setDeleteCard(true)}
        showEditButton={showEditButton}
        isLast={isLast}
        mobile={mobile}
      />
    </ContentWrapper>
  );
};

export default withRouter(CardItem);
