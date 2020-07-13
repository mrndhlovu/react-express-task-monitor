import React, { useState } from "react";

import CreateInput from "../sharedComponents/CreateInput";
import { useBoardContext } from "../../utils/hookUtils";

const MoveListDialog = ({ close, listId, listPosition }) => {
  const { getSourceList, boardUpdateHandler, board } = useBoardContext();

  const { lists } = board;
  const [targetPosition, setNewListPosition] = useState(listPosition);

  const handleChange = (e) => {
    const validator = /^[0-9\b]+$/;

    if (e.target.value === "" || validator.test(e.target.value))
      setNewListPosition(parseInt(e.target.value));
    else setNewListPosition(listPosition);
  };

  const handleCreateClick = () => {
    const isValidPosition =
      targetPosition !== 0 && targetPosition <= lists.length;

    if (isValidPosition) {
      const moveList = getSourceList(listId);

      lists.splice(lists.indexOf(moveList), 1);
      lists.splice(targetPosition - 1, 0, moveList);

      const newBoard = { ...board, lists };

      boardUpdateHandler(newBoard);
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
