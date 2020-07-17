import React, { Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { getUserInitials, findArrayItem } from "../../utils/appUtils";
import { Icon } from "semantic-ui-react";
import UserAvatar from "./UserAvatar";

const BoardMember = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-around;
`;
const Span = styled.span`
  font-size: 10px;
  font-weight: 700;
  padding: 0 10px;
`;

const BoardMembersList = ({
  boardMembers,
  handleBoardMemberClick,
  activeCard,
}) => {
  const hasAssignees =
    activeCard.assignees !== undefined && activeCard.assignees.length !== 0;

  return (
    <Fragment>
      {boardMembers.map((member) => (
        <BoardMember
          key={member.id}
          onClick={() => handleBoardMemberClick(member)}
        >
          <UserAvatar userInitials={getUserInitials(member.fname)} />
          <Span>
            {member.fname} {member.isAdmin && "(Admin)"}
          </Span>
          {hasAssignees &&
            findArrayItem(activeCard.assignees, member.id, "id") && (
              <Icon name="check" size="small" />
            )}
        </BoardMember>
      ))}
    </Fragment>
  );
};

BoardMembersList.propTypes = {
  boardMembers: PropTypes.arrayOf(
    PropTypes.shape({
      fname: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      assignees: PropTypes.arrayOf(PropTypes.object).isRequired,
    })
  ).isRequired,
};

export default BoardMembersList;
