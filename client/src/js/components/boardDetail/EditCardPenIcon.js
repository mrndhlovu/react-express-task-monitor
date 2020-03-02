import React from "react";
import styled from "styled-components";

import { Dropdown } from "semantic-ui-react";

const EditIconWrapper = styled.div`
  font-size: 13px;
  margin-left: 8px;
  opacity: ${props => (props.showEditButton ? 1 : 0)};
  position: absolute;
  right: 5px;
  top: 5px;
  transition-duration: 250ms;
  transition-timing-function: ease-in-out;
`;

const EditCardPenIcon = ({ handleDeleteCard, showEditButton }) => {
  return (
    <EditIconWrapper showEditButton={showEditButton}>
      <Dropdown floating icon="pencil alternate">
        <Dropdown.Menu>
          <Dropdown.Item>Move</Dropdown.Item>
          <Dropdown.Item onClick={handleDeleteCard}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </EditIconWrapper>
  );
};

export default EditCardPenIcon;
