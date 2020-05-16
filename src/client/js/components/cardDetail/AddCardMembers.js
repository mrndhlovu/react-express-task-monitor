import React from "react";

import CardDetailSegment from "../sharedComponents/CardDetailSegment";
import DropdownButton from "../sharedComponents/DropdownButton";
import BoardMembersList from "../sharedComponents/BoardMembersList";

const AddCardMembers = ({ boardMembers }) => {
  return (
    <DropdownButton
      as="h2"
      header="Board Members"
      icon="users"
      buttonText="Members"
    >
      <CardDetailSegment>
        <BoardMembersList boardMembers={boardMembers} />
      </CardDetailSegment>
    </DropdownButton>
  );
};

export default AddCardMembers;
