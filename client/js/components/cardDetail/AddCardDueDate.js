import React, { useState, useEffect } from "react";

import DropdownButton from "../sharedComponents/DropdownButton";
import PickDueDate from "../sharedComponents/PickDueDate";

const AddCardDueDate = ({
  activeCard,
  board,
  listPosition,
  handleBoardUpdate,
  getSourceList,
  saveCardChanges,
  color,
}) => {
  const [dueDate, setDueDate] = useState(false);
  const [removeDueDate, setRemoveDueDate] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const sourceList = getSourceList(listPosition).shift();

  const handleAddClick = () => setDueDate(true);
  const handleRemoveClick = () => setRemoveDueDate(true);

  useEffect(() => {
    let newCard;

    if (removeDueDate) {
      newCard = {
        ...activeCard,
        dueDate: "",
      };
    }

    if (dueDate) {
      newCard = {
        ...activeCard,
        dueDate: { date: `${startDate}`, complete: false },
      };
    }

    if (removeDueDate || dueDate) {
      saveCardChanges(newCard);
      sourceList.cards.splice(sourceList.cards.indexOf(activeCard), 1, newCard);
      board.lists.splice(board.lists.indexOf(sourceList), 1, sourceList);

      handleBoardUpdate(board, "lists", "dueDate");
    }

    return () => {
      setDueDate(false);
      setRemoveDueDate(false);
    };
  }, [
    handleBoardUpdate,
    board,
    activeCard,
    dueDate,
    removeDueDate,
    sourceList,
    startDate,
    saveCardChanges,
  ]);

  return (
    <DropdownButton
      icon="clock"
      buttonText="Due Date"
      header="Change Due Date."
      color={color}
    >
      <PickDueDate
        startDate={startDate}
        handleRemoveClick={handleRemoveClick}
        handleAddClick={handleAddClick}
        setStartDate={setStartDate}
      />
    </DropdownButton>
  );
};

export default AddCardDueDate;
