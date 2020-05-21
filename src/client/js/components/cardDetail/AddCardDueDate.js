import React, { useState, useEffect, lazy, Suspense } from "react";

import DropdownButton from "../sharedComponents/DropdownButton";
import { requestCardUpdate } from "../../apis/apiRequests";

const PickDueDate = lazy(() => import("../sharedComponents/PickDueDate"));

const AddCardDueDate = ({
  activeCard,
  saveCardChanges,
  saveBoardChanges,
  color,
  id,
  sourceId,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [updated, setUpdated] = useState(false);

  const handleUpdateDueDate = async (removeDate) => {
    let newCard;

    if (removeDate) {
      newCard = {
        ...activeCard,
        dueDate: "",
      };
    } else {
      newCard = {
        ...activeCard,
        dueDate: { date: `${startDate}`, complete: false },
      };
    }

    await requestCardUpdate({ newCard, listId: sourceId }, id).then((res) => {
      saveCardChanges(newCard);
      saveBoardChanges(res.data);
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
      color={color}
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
