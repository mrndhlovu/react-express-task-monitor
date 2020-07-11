import React, { useState } from "react";

import { requestCreateNewCard } from "../../apis/apiRequests";
import {
  useCardDetailContext,
  useBoardContext,
  useMainContext,
} from "../../utils/hookUtils";
import CreateInput from "../sharedComponents/CreateInput";
import DropdownButton from "../sharedComponents/DropdownButton";
import UIContainer from "../sharedComponents/UIContainer";

const CopyCardAction = () => {
  const { card, sourceId, id } = useCardDetailContext();
  const { saveBoardChanges } = useBoardContext();
  const { alertUser } = useMainContext();

  const [title, setTitle] = useState(`${card.title} clone`);
  const [copied, setCopied] = useState(null);

  const handleCopyCard = async () => {
    if (!title) return alertUser("Add a card title");

    const card = {
      ...card,
      title,
      archived: false,
    };
    delete card._id;
    const body = { card, listId: sourceId };

    await requestCreateNewCard(body, id)
      .then((res) => {
        saveBoardChanges(res.data);
        setCopied(true);
      })
      .catch((error) => alertUser(error.response.data.message));
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
          handleCreateClick={() => handleCopyCard()}
        />
      </UIContainer>
    </DropdownButton>
  );
};

export default CopyCardAction;
