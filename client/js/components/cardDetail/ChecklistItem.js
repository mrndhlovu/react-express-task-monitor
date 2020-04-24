import React, { memo } from "react";
import { Checkbox } from "semantic-ui-react";
import styled from "styled-components";

const Container = styled.div`
  padding: 8px 15px;
`;

const ChecklistItem = ({ item, handleCheckboxClick, isChecked }) => {
  return (
    <Container>
      <Checkbox
        id={item._id}
        label={item.description}
        checked={isChecked}
        onChange={() =>
          handleCheckboxClick(item._id, isChecked ? "todo" : "done")
        }
      />
    </Container>
  );
};

export default memo(ChecklistItem);
