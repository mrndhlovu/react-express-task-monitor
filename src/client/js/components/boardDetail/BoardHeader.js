import React from "react";
import styled from "styled-components";

import { useMainContext, useBoardContext } from "../../utils/hookUtils";
import BoardHeaderButtons from "./BoardHeaderButtons";
import EditableHeader from "../sharedComponents/EditableHeader";

const TitleWrapper = styled.div`
  align-self: auto;
  display: flex;
  padding: 10px;
`;

const BoardHeader = ({ user }) => {
  const { board, handleShowMenuClick } = useBoardContext();
  const { mobile } = useMainContext().device;

  return (
    <div className="board-header">
      <TitleWrapper>
        <EditableHeader type="boardTitle" title={board.title} />
      </TitleWrapper>
      {user && (
        <BoardHeaderButtons
          mobile={mobile}
          isStarred={user.starred.includes(board._id)}
          handleShowMenuClick={handleShowMenuClick}
        />
      )}
    </div>
  );
};

export default BoardHeader;
