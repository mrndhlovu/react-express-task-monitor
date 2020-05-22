import React from "react";

import CardDetailSegment from "../sharedComponents/CardDetailSegment";
import DropdownButton from "../sharedComponents/DropdownButton";
import BoardMembersList from "../sharedComponents/BoardMembersList";
import { requestCardUpdate } from "../../apis/apiRequests";
import { findArrayItem } from "../../utils/appUtils";

const AddCardMembers = ({
  boardMembers,
  activeCard,
  id,
  sourceId,
  saveCardChanges,
  saveBoardChanges,
}) => {
  const handleBoardMemberClick = (boardMember) => {
    const isInAssigneeList = findArrayItem(
      activeCard.assignees,
      boardMember.id,
      "id"
    );
    const memberIndex = activeCard.assignees.indexOf(boardMember);

    isInAssigneeList
      ? activeCard.assignees.splice(memberIndex, 1)
      : activeCard.assignees.push(boardMember);
    const body = { newCard: activeCard, listId: sourceId };
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
          boardMembers={boardMembers}
          handleBoardMemberClick={handleBoardMemberClick}
          activeCard={activeCard}
        />
      </CardDetailSegment>
    </DropdownButton>
  );
};

export default AddCardMembers;
