import React, { useState } from "react";
import PropTypes from "prop-types";

import { useBoardContext } from "../../utils/hookUtils";
import CreateInput from "../sharedComponents/CreateInput";

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

  const moveListHandler = () => {
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
      createItemClickHandler={moveListHandler}
    />
  );
};

MoveListDialog.propTypes = {
  close: PropTypes.func.isRequired,
  listId: PropTypes.string.isRequired,
  listPosition: PropTypes.func,
};

export default MoveListDialog;
