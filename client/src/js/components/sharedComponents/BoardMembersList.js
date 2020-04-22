import React, { Fragment } from "react";
import styled from "styled-components";

import UserAvatar from "../sharedComponents/UserAvatar";
import { getUserInitials } from "../../utils/appUtils";

const BoardMember = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
`;
const Span = styled.span`
  font-size: 10px;
  font-weight: 700;
  padding-left: 10px;
`;

const BoardMembersList = ({ boardMembers, handleClick }) => {
  return (
    <Fragment>
      {boardMembers.map((member) => (
        <BoardMember key={member.id} onClick={() => handleClick(member)}>
          <UserAvatar userInitials={getUserInitials(member.fname)} />
          <Span>
            {member.fname} {member.isAdmin && "(Admin)"}
          </Span>
        </BoardMember>
      ))}
    </Fragment>
  );
};

export default BoardMembersList;
