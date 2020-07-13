import React from "react";

import {
  useMainContext,
  useBoardContext,
  useAuth,
} from "../../utils/hookUtils";
import BoardHeaderButtons from "./BoardHeaderButtons";
import EditableHeader from "../sharedComponents/EditableHeader";

const BoardHeader = () => {
  const { board, handleShowMenuClick } = useBoardContext();
  const { user } = useAuth();
  const { mobile } = useMainContext().device;

  return (
    <div className="board-header">
      <EditableHeader title={board.title} type="boardTitle" />

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
