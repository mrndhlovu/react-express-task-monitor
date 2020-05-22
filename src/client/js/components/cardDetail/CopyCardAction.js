import React, { useState } from "react";

import { requestCreateNewCard } from "../../apis/apiRequests";
import CreateInput from "../sharedComponents/CreateInput";
import DropdownButton from "../sharedComponents/DropdownButton";
import UIContainer from "../sharedComponents/UIContainer";

const CopyCardAction = ({ activeCard, id, sourceId, saveBoardChanges }) => {
  const [title, setTitle] = useState(`${activeCard.title} clone`);
  const [copied, setCopied] = useState(null);

  const handleCopyCard = async () => {
    const card = {
      ...activeCard,
      title,
      archived: false,
    };
    delete card._id;
    const body = { card, listId: sourceId };

    await requestCreateNewCard(body, id).then((res) => {
      saveBoardChanges(res.data);
      setCopied(true);
    });
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
