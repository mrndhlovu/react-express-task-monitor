import React, { useState } from "react";

import { requestCreateNewCard } from "../../apis/apiRequests";
import {
  useCardDetailContext,
  useBoardContext,
  useMainContext,
} from "../../utils/hookUtils";
import CreateInput from "../shared/CreateInput";
import DropdownButton from "../shared/DropdownButton";
import UIContainer from "../shared/UIContainer";

const CopyCardAction = () => {
  const { card, sourceId, id } = useCardDetailContext();
  const { updateBoardState } = useBoardContext();
  const { alertUser } = useMainContext();

  const [title, setTitle] = useState(`${card.title} clone`);
  const [copied, setCopied] = useState(null);

  const handleCopyCard = async () => {
    if (!title) return alertUser("Add a card title");

    const cardClone = {
      ...card,
      title,
      archived: false,
    };
    delete cardClone._id;
    const body = { cardClone, listId: sourceId };

    await requestCreateNewCard(body, id)
      .then((res) => {
        updateBoardState(res.data);
        setCopied(true);
      })
      .catch((error) => alertUser(error.response?.data.message));
  };

  return (
    <DropdownButton
      close={copied}
      header="Copy"
      icon="copy"
      buttonText="Copy"
      upward={true}
    >
      <UIContainer width="100%">
        <CreateInput
          hideIcon={true}
          buttonText="Copy"
          placeholder="Enter a new card title"
          defaultValue={title}
          handleChange={(e) => setTitle(e.target.value)}
          createItemClickHandler={() => handleCopyCard()}
        />
      </UIContainer>
    </DropdownButton>
  );
};

export default CopyCardAction;
