import React, { useState } from "react";
import update from "immutability-helper";

import List from "./List";
import { useBoardContext } from "../../utils/hookUtils";

const ListGrid = () => {
  const { board, boardUpdateHandler, updateBoardState } = useBoardContext();

  const [lists, setLists] = useState(undefined);
  const [dragIndex, setDragIndex] = useState(undefined);
  const boardLists = lists || board.lists;

  const listDropHandler = () =>
    boardUpdateHandler(board, undefined, () => {
      setLists(null);
      setDragIndex(null);
    });

  const moveListHandler = (hoverIndex) => {
    const dragList = board.lists[dragIndex];

    const updatedLists = update(board.lists, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragList],
      ],
    });
    setLists(updatedLists);

    updateBoardState({ ...board, lists: updatedLists });
  };

  return Object.keys(boardLists).map((key, index) => (
    <List
      key={key}
      position={index + 1}
      list={boardLists[key]}
      moveListHandler={moveListHandler}
      listDropHandler={listDropHandler}
      setDragIndex={setDragIndex}
      dragIndex={dragIndex}
    />
  ));
};

export default ListGrid;
