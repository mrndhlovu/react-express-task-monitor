import React, { memo } from "react";
import PropTypes from "prop-types";

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

ChecklistItem.propTypes = {
  handleCheckboxClick: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  position: PropTypes.number.isRequired,
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default memo(ChecklistItem);
