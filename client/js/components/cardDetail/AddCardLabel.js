import React, { useState, useEffect } from "react";
import DropdownButton from "../sharedComponents/DropdownButton";
import CardLabelColors from "../sharedComponents/CardLabelColors";

const AddCardLabel = ({
  activeCard,
  handleBoardUpdate,
  board,
  sourceId,
  getSourceList,
}) => {
  const { labels } = activeCard;

  const [label, setLabel] = useState(null);
  const [removeLabel, setRemoveLabel] = useState(null);

  const handleColorClick = (color) => {
    if (labels.includes(color)) return setRemoveLabel(color);
    setLabel(color);
  };

  useEffect(() => {
    let activity;
    const sourceList = getSourceList(sourceId, "_id").shift();
    console.log("sourceList: ", sourceList);

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
      handleBoardUpdate(board, "lists", activity);
    }

    return () => {
      setLabel(null);
      setRemoveLabel(null);
    };
  }, [
    activeCard,
    handleBoardUpdate,
    board,
    getSourceList,
    label,
    labels,
    sourceId,
    removeLabel,
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
