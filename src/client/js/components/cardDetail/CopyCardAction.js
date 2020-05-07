import React, { useState, useEffect } from "react";

import { Message } from "semantic-ui-react";

import { emptyFunction } from "../../utils/appUtils";
import { requestCreateNewCard } from "../../apis/apiRequests";
import CreateInput from "../sharedComponents/CreateInput";
import DropdownButton from "../sharedComponents/DropdownButton";
import UIContainer from "../sharedComponents/UIContainer";

const CopyCardAction = ({ activeCard, id, sourceId, saveBoardChanges }) => {
  const [title, setTitle] = useState(`${activeCard.title} clone`);
  const [copy, setCopy] = useState(false);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    if (!copy) return emptyFunction();

    const copyCard = async () => {
      const card = {
        ...activeCard,
        title,
        archived: false,
      };

      delete card._id;
      console.log("newCard: ", card);

      const body = { card, listId: sourceId };

      await requestCreateNewCard(body, id).then((res) => {
        try {
          setMessage(true);
          saveBoardChanges(res.body);
        } catch (error) {}
      });
    };

    copyCard();
    setCopy(false);
  }, [activeCard, title, requestCreateNewCard, id, sourceId, copy]);

  return (
    <DropdownButton header="Copy" icon="copy" buttonText="Copy" upward={true}>
      <UIContainer width="100%">
        {message && (
          <Message
            positive
            content="Card copied"
            onDismiss={() => setMessage(false)}
          />
        )}
        <CreateInput
          hideIcon={true}
          buttonText="Copy"
          placeholder="Enter a new card title"
          defaultValue={title}
          handleChange={(e) => setTitle(e.target.value)}
          handleCreateClick={() => setCopy(true)}
        />
      </UIContainer>
    </DropdownButton>
  );
};

export default CopyCardAction;
