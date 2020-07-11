import React from "react";

import { findArrayItem } from "../../utils/appUtils";
import { requestCardUpdate } from "../../apis/apiRequests";
import { useCardDetailContext, useBoardContext } from "../../utils/hookUtils";
import BoardMembersList from "../sharedComponents/BoardMembersList";
import CardDetailSegment from "../sharedComponents/CardDetailSegment";
import DropdownButton from "../sharedComponents/DropdownButton";

const AddCardMembers = () => {
  const { card, saveCardChanges, sourceId, id } = useCardDetailContext();
  const { saveBoardChanges, board } = useBoardContext();

  const handleBoardMemberClick = (boardMember) => {
    const isInAssigneeList = findArrayItem(
      card.assignees,
      boardMember.id,
      "id"
    );
    const memberIndex = card.assignees.indexOf(boardMember);

    isInAssigneeList
      ? card.assignees.splice(memberIndex, 1)
      : card.assignees.push(boardMember);
    const body = { newCard: card, listId: sourceId };
    const update = async () => {
      await requestCardUpdate(body, id).then((res) => {
        saveCardChanges(body.newCard);
        saveBoardChanges(res.data);
      });
    };

    update();
  };

  return (
    <DropdownButton
      as="h2"
      header="Board Members"
      icon="users"
      buttonText="Members"
    >
      <CardDetailSegment>
        <BoardMembersList
          boardMembers={board.members}
          handleBoardMemberClick={handleBoardMemberClick}
          activeCard={card}
        />
      </CardDetailSegment>
    </DropdownButton>
  );
};

export default AddCardMembers;
