import React from "react";
import styled from "styled-components";

import CardDetailSegment from "../sharedComponents/CardDetailSegment";
import DropdownButton from "../sharedComponents/DropdownButton";
import UserAvatar from "../sharedComponents/UserAvatar";
import { getUserInitials } from "../../utils/appUtils";

const BoardMember = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;
const Span = styled.span`
  font-size: 10px;
  font-weight: 700;
  padding-left: 10px;
`;

const AddCardMembers = ({ boardMembers }) => {
  return (
    <DropdownButton
      as="h2"
      header="Board Members"
      icon="users"
      buttonText="Members"
    >
      <CardDetailSegment>
        {boardMembers.map(member => (
          <BoardMember key={member.id}>
            <UserAvatar userInitials={getUserInitials(member.fname)} />
            <Span>
              {member.fname} {member.isAdmin && "(Admin)"}
            </Span>
          </BoardMember>
        ))}
      </CardDetailSegment>
    </DropdownButton>
  );
};

export default AddCardMembers;
