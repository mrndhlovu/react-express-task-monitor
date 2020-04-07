import React from "react";
import styled from "styled-components";

import DropdownButton from "../sharedComponents/DropdownButton";
import { Button } from "semantic-ui-react";

const Container = styled.div`
  padding: 8px 5px;
`;

const AddCardCheckList = ({ handleCreateChecklist, mobile }) => {
  return (
    <DropdownButton
      icon="check square outline"
      header="Add Checklist"
      buttonText="Checklist"
      closeOnSelect={true}
    >
      <Container>
        <Button
          fluid
          compact
          positive
          content="Add"
          defaultValue="Checklist"
          onClick={() => handleCreateChecklist()}
        />
      </Container>
    </DropdownButton>
  );
};

export default AddCardCheckList;
