import React, { useState, useEffect } from "react";
import DropdownButton from "../sharedComponents/DropdownButton";
import CardLabelColors from "../sharedComponents/CardLabelColors";

const AddCardLabel = ({
  activeCard,
  backendUpdate,
  board,
  listPosition,
  getSourceList
}) => {
  const { labels } = activeCard;

  const [label, setLabel] = useState(null);
  const [removeLabel, setRemoveLabel] = useState(null);

  const handleColorClick = color => {
    if (labels.includes(color)) return setRemoveLabel(color);
    setLabel(color);
  };

  useEffect(() => {
    let activity;
    const sourceList = getSourceList(listPosition).shift();

    if (label) {
      activity = "addLabel";
      activeCard.labels.push(label);
    }

    if (removeLabel) {
      activity = "removeLabel";
      activeCard.labels.splice(labels.indexOf(removeLabel), 1);
    }

    if (activity) {
      sourceList.cards.splice(
        sourceList.cards.indexOf(activeCard),
        1,
        activeCard
      );

      board.lists.splice(board.lists.indexOf(sourceList), 1, sourceList);
      backendUpdate(board, "lists", activity);
    }

    return () => {
      setLabel(null);
      setRemoveLabel(null);
    };
  }, [
    activeCard,
    backendUpdate,
    board,
    getSourceList,
    label,
    labels,
    listPosition,
    removeLabel
  ]);

  return (
    <DropdownButton icon="tags" buttonText="Labels" header="Labels">
      <CardLabelColors
        labels={activeCard.labels}
        handleColorClick={handleColorClick}
      />
    </DropdownButton>
  );
};

export default AddCardLabel;
