import React from "react";

import { useMainContext, useBoardContext } from "../../utils/hookUtils";
import BoardHeaderButtons from "./BoardHeaderButtons";
import EditableHeader from "../sharedComponents/EditableHeader";

const BoardHeader = ({ user }) => {
  const { board, handleShowMenuClick, handleBoardUpdate } = useBoardContext();
  const { mobile } = useMainContext().device;

  return (
    <div className="board-header">
      <EditableHeader
        board={board}
        handleBoardUpdate={handleBoardUpdate}
        title={board.title}
        type="boardTitle"
      />

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
