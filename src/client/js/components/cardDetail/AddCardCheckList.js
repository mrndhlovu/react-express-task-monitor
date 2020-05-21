import React, { useState, useEffect } from "react";

import { emptyFunction, findArrayItem, resetForm } from "../../utils/appUtils";
import { requestNewChecklist } from "../../apis/apiRequests";
import CreateInput from "../sharedComponents/CreateInput";
import DropdownButton from "../sharedComponents/DropdownButton";
import UIContainer from "../sharedComponents/UIContainer";
import UIMessage from "../sharedComponents/UIMessage";

const AddCardCheckList = ({
  activeCard,
  id,
  saveBoardChanges,
  saveCardChanges,
  sourceId,
}) => {
  const [add, setAdd] = useState(false);
  const [close, setClose] = useState(false);
  const [checklist, setChecklist] = useState(null);
  const [message, setMessage] = useState({ header: null, lists: [] });

  useEffect(() => {
    if (!add) return emptyFunction();
    const checkChecklist = async () => {
      const body = {
        checklist: { name: checklist ? checklist : "Checklist" },
        cardId: activeCard._id,
        listId: sourceId,
      };

      await requestNewChecklist(body, id).then((res) => {
        try {
          const sourceList = findArrayItem(res.data.lists, sourceId, "_id");
          activeCard = findArrayItem(sourceList.cards, activeCard._id, "_id");
          saveCardChanges(activeCard);
          saveBoardChanges(res.data);
          setClose(true);
          resetForm("new-checklist");
          setChecklist(null);
        } catch (error) {
          setMessage({
            ...message,
            header: "Failed to create a checklist",
            lists: [error.message],
          });
        }
      });
    };

    checkChecklist();
    setAdd(false);
  }, [
    activeCard,
    message,
    sourceId,
    checklist,
    add,
    saveBoardChanges,
    saveCardChanges,
    resetForm,
    id,
  ]);

  useEffect(() => {
    return () => {
      setTimeout(() => {
        setClose(false);
      }, 500);
    };
  });

  return (
    <DropdownButton
      buttonText="Checklist"
      closeOnSelect={true}
      header="Add Checklist"
      icon="check square outline"
      close={close}
    >
      <UIContainer padding="5px 10px" width="300px">
        {message.header && (
          <UIMessage
            error={true}
            handleDismiss={() => setMessage({ header: null, lists: [] })}
            list={message.lists}
            message={message.header}
          />
        )}
        <CreateInput
          buttonText="Add"
          handleChange={(e) => setChecklist(e.target.value)}
          handleCreateClick={() => setAdd(true)}
          hideIcon={true}
          defaultValue="Checklist"
          id="new-checklist"
          placeholder="Checklist name"
        />
      </UIContainer>
    </DropdownButton>
  );
};

export default AddCardCheckList;
