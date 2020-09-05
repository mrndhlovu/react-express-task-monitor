import React from "react";

import { useMainContext, useBoardContext } from "../../utils/hookUtils";
import BoardHeaderButtons from "./BoardHeaderButtons";
import EditableHeader from "../shared/EditableHeader";

const BoardHeader = () => {
  const { board, boardUpdateHandler } = useBoardContext();
  const { mobile } = useMainContext().device;

  return (
    <div className="board-header">
      <EditableHeader
        editItem={board}
        color="white"
        fontSize="18px"
        handleEditTitle={(newBoard) => boardUpdateHandler(newBoard, "title")}
      />
      <BoardHeaderButtons isBoardMenu={mobile} />
    </div>
  );
};

export default BoardHeader;
