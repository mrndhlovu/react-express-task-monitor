import React from "react";
import styled from "styled-components";

import { Link } from "react-scroll";

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
        <Link
          to="card-checklist"
          activeClass="card-checklist"
          spy={true}
          smooth={true}
          offset={0}
          duration={2000}
          onClick={() => handleCreateChecklist()}
        >
          <Button
            fluid
            compact
            positive
            content="Add"
            defaultValue="Checklist"
            onClick={() => !mobile && handleCreateChecklist()}
          />
        </Link>
      </Container>
    </DropdownButton>
  );
};

export default AddCardCheckList;
