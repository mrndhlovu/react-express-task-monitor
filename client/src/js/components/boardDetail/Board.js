import React, { useContext, useEffect } from "react";

import BoardLists from "./BoardLists";
import BoardHeader from "../home/BoardHeader";
import { BoardContext } from "../../utils/contextUtils";
import { allowed } from "../../constants/constants";
import { filterObject } from "../../utils/appUtils";
import { requestBoardUpdate } from "../../apis/apiRequests";

const Board = () => {
  const { board, id } = useContext(BoardContext);

  useEffect(() => {
    const now = new Date();
    const previous = new Date(board.date);
    const elapsed = now - previous;
    const justCreated = elapsed / 1000 < 200;

    const newBoard = filterObject(board, allowed);
    const updateSection =
      (newBoard.section.includes("default") ||
        newBoard.section.includes("starred")) &&
      !justCreated;

    if (updateSection) {
      newBoard.section.pop();
      newBoard.section.push("recent");

      requestBoardUpdate(id, newBoard);
    }
  }, [id, board]);

  return (
    <>
      <BoardHeader />
      <BoardLists />
    </>
  );
};

export default Board;
