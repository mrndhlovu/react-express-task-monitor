import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import {
  getFormattedDate,
  stringsEqual,
  findArrayItem,
} from "../../utils/appUtils";
import { useBoardContext, useBoardListContext } from "../../utils/hookUtils";
import Assignees from "../sharedComponents/Assignees";
import CardBadge from "../sharedComponents/CardBadge";
import CardCover from "../cardDetail/CardCover";
import EditCardModal from "./EditCardModal";
import EditCardPenIcon from "./EditCardPenIcon";
import LabelsSnippets from "./LabelsSnippets";

const CardTitle = styled.div`
  color: #172b4d;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.8px;
  padding: 5px 10px;
  &:after {
    content: '${({ title }) => title}';
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

const CardContainer = styled.div`
  position: relative;
  border-radius: 3px;
  box-shadow: 0 1px 0 #091e4240;
  margin-top: 7px;
  min-height: 20px;
  background: #fff;
`;

const BadgeContainer = styled.div`
  padding: 2px 10px;
  display: flex;
  vertical-align: bottom;
  align-items: flex-end;
`;

const CardDetail = ({ card, sourceListId, showEditButton }) => {
  const { boardUpdateHandler, board } = useBoardContext();
  const { cardClickHandler } = useBoardListContext();

  const hasLabel = card.labels.length !== 0;
  const hasAttachments = card.attachments.length !== 0;
  const hasChecklist = card.checklists.length !== 0;
  const hasDescription = !stringsEqual(card.shortDescription, "");
  const hasComments = card.comments.length !== 0;
  const hasAssignees = card.assignees.length !== 0;
  const hasDueDate = Object.values(card.dueDate).length !== 0;

  const [openCardModal, setOpenCardModal] = useState(false);

  const deleteCardHandler = () => {
    const sourceList = findArrayItem(board.lists, sourceListId, "_id");
    sourceList.cards.splice(sourceList.cards.indexOf(card));
    board.lists.splice(board.lists.indexOf(sourceList), 1, sourceList);

    return boardUpdateHandler(board);
  };

  return (
    <CardContainer>
      <ContentWrapper onClick={() => cardClickHandler(card, sourceListId)}>
        <LabelsSnippets labels={card.labels} hasLabel={hasLabel} />
        <Container>
          <CardCover card={card} />
          <CardTitle edit={showEditButton} title={card.title} />
        </Container>
      </ContentWrapper>

      <BadgeContainer>
        <CardBadge
          icon="attachment"
          content={card.attachments.length}
          hasBadge={hasAttachments}
        />

        <CardBadge icon="checklist" hasBadge={hasChecklist} />

        <CardBadge
          icon="comment"
          content={card.comments.length}
          hasBadge={hasComments}
        />

        <CardBadge icon="description" hasBadge={hasDescription} />

        <CardBadge
          icon="dueDate"
          content={getFormattedDate(card.dueDate.date, "MMM Do")}
          hasBadge={hasDueDate}
          as=""
          color="yellow"
          className="date-badge"
        />
        {hasAssignees && <Assignees assignees={card.assignees} />}
      </BadgeContainer>

      {showEditButton && (
        <EditCardPenIcon setOpenCardModal={setOpenCardModal} />
      )}
      <EditCardModal
        cardItem={card}
        deleteCardHandler={() => deleteCardHandler()}
        sourceListId={sourceListId}
        openCardModal={openCardModal}
        setOpenCardModal={setOpenCardModal}
      />
    </CardContainer>
  );
};

CardDetail.propTypes = {
  card: PropTypes.object.isRequired,
  showEditButton: PropTypes.bool.isRequired,
  sourceListId: PropTypes.string.isRequired,
};

export default withRouter(CardDetail);