import React, { memo } from "react";

import { Checkbox } from "semantic-ui-react";

const ChecklistItem = ({
  item,
  handleCheckboxClick,
  isCompleted,
  position,
}) => {
  return (
    <Checkbox
      className={isCompleted ? "item-complete" : "item-doing"}
      id={item._id}
      label={item.description}
      checked={isCompleted}
      onChange={() =>
        handleCheckboxClick(position - 1, isCompleted ? "doing" : "done")
      }
    />
  );
};

export default memo(ChecklistItem);
