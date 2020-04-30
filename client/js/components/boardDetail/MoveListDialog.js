import React, { useState } from "react";
import styled from "styled-components";

import CreateInput from "../sharedComponents/CreateInput";

const MoveListDialog = ({
  close,
  listPosition,
  handleBoardUpdate,
  board,
  getSourceList,
}) => {
  const sourceId = listPosition;
  const { lists } = board;
  const [targetPosition, setNewListPosition] = useState(sourceId);

  const handleChange = (e) => {
    const validator = /^[0-9\b]+$/;

    if (e.target.value === "" || validator.test(e.target.value))
      setNewListPosition(parseInt(e.target.value));
    else setNewListPosition(sourceId);
  };

  const handleCreateClick = () => {
    const isValidPosition =
      targetPosition !== 0 && targetPosition <= lists.length;

    if (isValidPosition) {
      const moveList = getSourceList(sourceId - 1);

      lists.splice(lists.indexOf(moveList), 1);
      lists.splice(targetPosition - 1, 0, moveList);

      const newBoard = { ...board, lists };

      handleBoardUpdate(newBoard);
    }
    return close();
  };

  return (
    <CreateInput
      buttonText="Move to position"
      close={close}
      placeholder="Enter new position"
      handleChange={handleChange}
      handleCreateClick={handleCreateClick}
    />
  );
};

export default MoveListDialog;
