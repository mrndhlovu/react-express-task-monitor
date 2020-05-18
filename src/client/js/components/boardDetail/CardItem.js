import React, { useState, useContext, useEffect, Fragment } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { BoardListsContext, BoardContext } from "../../utils/contextUtils";
import { getFormattedDate, stringsEqual } from "../../utils/appUtils";
import CardBadge from "../sharedComponents/CardBadge";
import CardCover from "../cardDetail/CardCover";
import EditCardPenIcon from "./EditCardPenIcon";
import LabelsSnippets from "./LabelsSnippets";
import EditCardModal from "./EditCardModal";
import Assignees from "../sharedComponents/Assignees";

const CardTitle = styled.div`
  color: #172b4d;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.8px;
  padding: 5px 10px;
  &:after {
    content: '${(props) => props.title}';
  }
`;

const ContentWrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  max-width: 256px;
`;

const Container = styled.div`
  padding: 5px;
`;

const BadgeContainer = styled.div`
  padding: 2px 10px;
  display: flex;
`;

const CardItem = ({
  card,
  sourceListId,
  sourceTitle,
  match,
  history,
  showEditButton,
  listPosition,
}) => {
  const {
    handleBoardUpdate,
    handleCardClick,
    updateBoard,
    board,
    mobile,
  } = useContext(BoardListsContext);
  const { saveBoardChanges } = useContext(BoardContext);

  const hasLabel = card.labels.length !== 0;
  const hasAttachments = card.attachments.length !== 0;
  const hasChecklist = card.checklists.length !== 0;
  const hasDescription = !stringsEqual(card.shortDescription, "");
  const hasComments = card.comments.length !== 0;
  const hasAssignees = card.assignees.length !== 0;
  const hasDueDate = card.dueDate;
  const { id } = match.params;

  const [deleteCard, setDeleteCard] = useState(false);
  const [openCardModal, setOpenCardModal] = useState(false);

  useEffect(() => {
    if (!deleteCard) return;
    const deleteCardItem = async () => {
      const newBoard = {
        ...board,
        lists: board.lists.map((list) =>
          list._id === sourceListId
            ? {
                ...list,
                cards: list.cards.filter((item) => item._id !== card._id),
              }
            : { ...list }
        ),
      };

      updateBoard(newBoard, "deleteCard");
    };
    deleteCardItem();
    setDeleteCard(false);
  }, [card, deleteCard, sourceListId, handleBoardUpdate, board, updateBoard]);

  return (
    <Fragment>
      <ContentWrapper
        onClick={() => handleCardClick(card, sourceListId, sourceTitle)}
      >
        <LabelsSnippets labels={card.labels} hasLabel={hasLabel} />
        <Container>
          <CardCover card={card} />
          <CardTitle edit={showEditButton} title={card.title} />
        </Container>
      </ContentWrapper>

      <BadgeContainer>
        <CardBadge
          icon="attach"
          content={card.attachments.length}
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
        {hasAssignees && <Assignees assignees={card.assignees} />}
      </BadgeContainer>

      {showEditButton && (
        <EditCardPenIcon setOpenCardModal={setOpenCardModal} />
      )}
      <EditCardModal
        cardItem={card}
        handleDeleteCard={() => setDeleteCard(true)}
        history={history}
        id={id}
        sourceListId={sourceListId}
        listPosition={listPosition}
        mobile={mobile}
        openCardModal={openCardModal}
        setOpenCardModal={setOpenCardModal}
        saveBoardChanges={saveBoardChanges}
        handleBoardUpdate={handleBoardUpdate}
        hasDueDate={hasDueDate}
      />
    </Fragment>
  );
};

export default withRouter(CardItem);
