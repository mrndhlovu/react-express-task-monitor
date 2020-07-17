import React, { useState, useEffect } from "react";

import { findArrayItem, resetForm } from "../../utils/appUtils";
import { requestNewChecklist } from "../../apis/apiRequests";
import {
  useCardDetailContext,
  useBoardContext,
  useMainContext,
} from "../../utils/hookUtils";
import CreateInput from "../sharedComponents/CreateInput";
import DropdownButton from "../sharedComponents/DropdownButton";
import UIContainer from "../sharedComponents/UIContainer";

const AddCardCheckList = () => {
  const { card, sourceId, saveCardChanges, id } = useCardDetailContext();
  const { updateBoardState } = useBoardContext();
  const { alertUser } = useMainContext();

  const [close, setClose] = useState(false);
  const [checklist, setChecklist] = useState(null);

  const handleCreateChecklist = async () => {
    if (!checklist) return alertUser("Add checklist name");

    const body = {
      checklist: { name: checklist ? checklist : "Checklist" },
      cardId: card._id,
      listId: sourceId,
    };

    await requestNewChecklist(body, id)
      .then((res) => {
        const sourceList = findArrayItem(res.data.lists, sourceId, "_id");

        saveCardChanges(findArrayItem(sourceList.cards, card._id, "_id"));
        updateBoardState(res.data);
        setClose(true);
        resetForm("new-checklist");
        setChecklist(null);
      })
      .catch((error) => alertUser(error.response.data.message));
  };

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
        <CreateInput
          buttonText="Add"
          handleChange={(e) => setChecklist(e.target.value)}
          createItemClickHandler={() => handleCreateChecklist()}
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
