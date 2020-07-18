import React from "react";

import { useMainContext, useBoardContext } from "../../utils/hookUtils";
import BoardHeaderButtons from "./BoardHeaderButtons";
import EditableHeader from "../sharedComponents/EditableHeader";

const BoardHeader = () => {
  const { board } = useBoardContext();
  const { mobile } = useMainContext().device;

  return (
    <div className="board-header">
      <EditableHeader
        title={board.title}
        type="boardTitle"
        color="white"
        fontSize="18px"
      />
      <BoardHeaderButtons isBoardMenu={mobile} />
    </div>
  );
};

export default BoardHeader;
