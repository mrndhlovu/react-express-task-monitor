import React, { useState, useEffect, lazy, Suspense } from "react";

import { requestCardUpdate } from "../../apis/apiRequests";
import { useCardDetailContext, useBoardContext } from "../../utils/hookUtils";
import DropdownButton from "../sharedComponents/DropdownButton";

const PickDueDate = lazy(() => import("../sharedComponents/PickDueDate"));

const AddCardDueDate = () => {
  const { card, saveCardChanges, id, sourceId } = useCardDetailContext();
  const { updateBoardState } = useBoardContext();

  const [startDate, setStartDate] = useState(new Date());
  const [updated, setUpdated] = useState(false);

  const handleUpdateDueDate = async (removeDate) => {
    let newCard;

    if (removeDate) {
      newCard = {
        ...card,
        dueDate: "",
      };
    } else {
      newCard = {
        ...card,
        dueDate: { date: `${startDate}`, complete: false },
      };
    }

    await requestCardUpdate({ newCard, listId: sourceId }, id).then((res) => {
      saveCardChanges(newCard);
      updateBoardState(res.data);
      setUpdated(true);
    });
  };

  useEffect(() => {
    return () => {
      setTimeout(() => {
        setUpdated(false);
      }, 500);
    };
  });

  return (
    <DropdownButton
      icon="clock"
      buttonText="Due Date"
      header="Change Due Date."
      close={updated}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <PickDueDate
          startDate={startDate}
          handleUpdateDueDate={handleUpdateDueDate}
          setStartDate={setStartDate}
        />
      </Suspense>
    </DropdownButton>
  );
};

export default AddCardDueDate;
