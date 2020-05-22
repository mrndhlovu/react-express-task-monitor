import React from "react";
import DropdownButton from "../sharedComponents/DropdownButton";
import CardLabelColors from "../sharedComponents/CardLabelColors";
import { requestCardUpdate } from "../../apis/apiRequests";

const AddCardLabel = ({ activeCard, saveBoardChanges, id, sourceId }) => {
  const { labels } = activeCard;

  const handleColorClick = async (color) => {
    if (labels.includes(color)) {
      activeCard.labels.splice(labels.indexOf(color), 1);
    } else {
      activeCard.labels.push(color);
    }

    const body = { newCard: activeCard, listId: sourceId };
    await requestCardUpdate(body, id).then((res) => saveBoardChanges(res.data));
  };

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
