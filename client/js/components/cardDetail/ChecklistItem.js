import React, { memo } from "react";
import styled from "styled-components";

import { Checkbox } from "semantic-ui-react";

const Container = styled.div`
  padding: 8px 15px;
`;

const ChecklistItem = ({
  item,
  handleCheckboxClick,
  isCompleted,
  position,
}) => {
  return (
    <Container>
      <Checkbox
        className={isCompleted ? "item-complete" : "item-doing"}
        id={item._id}
        label={item.description}
        checked={isCompleted}
        onChange={() =>
          handleCheckboxClick(position - 1, isCompleted ? "doing" : "done")
        }
      />
    </Container>
  );
};

export default memo(ChecklistItem);
