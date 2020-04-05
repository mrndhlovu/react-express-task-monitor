import React from "react";
import styled from "styled-components";

import { Dropdown } from "semantic-ui-react";

const EditIconWrapper = styled.div`
  font-size: 13px;
  margin-left: 8px;
  opacity: ${props => (props.showEditButton ? 1 : 0)};
  position: absolute;
  right: 0px;
  top: 11px;
  transition-duration: 250ms;
  transition-timing-function: ease-in-out;
  z-index: 1000;
`;

const EditCardPenIcon = ({ handleDeleteCard, showEditButton, isLast }) => {
  const upward = isLast ? isLast : false;

  return (
    <EditIconWrapper showEditButton={showEditButton}>
      <Dropdown icon="pencil alternate" direction="left" upward={upward}>
        <Dropdown.Menu>
          <Dropdown.Item>Move</Dropdown.Item>
          <Dropdown.Item onClick={handleDeleteCard}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </EditIconWrapper>
  );
};

export default EditCardPenIcon;
