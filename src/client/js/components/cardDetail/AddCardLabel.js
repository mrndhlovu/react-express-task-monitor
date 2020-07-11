import React from "react";

import { requestCardUpdate } from "../../apis/apiRequests";
import CardLabelColors from "../sharedComponents/CardLabelColors";
import DropdownButton from "../sharedComponents/DropdownButton";
import { useCardDetailContext, useBoardContext } from "../../utils/hookUtils";

const AddCardLabel = () => {
  const { card, id, sourceId } = useCardDetailContext();
  const { saveBoardChanges } = useBoardContext();

  const { labels } = card;

  const handleColorClick = async (color) => {
    if (labels.includes(color)) {
      card.labels.splice(labels.indexOf(color), 1);
    } else {
      card.labels.push(color);
    }

    const body = { newCard: card, listId: sourceId };
    await requestCardUpdate(body, id).then((res) => saveBoardChanges(res.data));
  };

  return (
    <DropdownButton icon="tags" buttonText="Labels" header="Labels">
      <CardLabelColors
        labels={card.labels}
        handleColorClick={handleColorClick}
      />
    </DropdownButton>
  );
};

export default AddCardLabel;
