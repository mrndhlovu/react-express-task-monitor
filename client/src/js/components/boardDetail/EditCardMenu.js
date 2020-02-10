import React from "react";
import styled from "styled-components";

import { Dropdown } from "semantic-ui-react";

const EditIconWrapper = styled.div`
  justify-self: end;
  font-size: 13px;
  opacity: ${props => (props.showEditButton ? 1 : 0)};
  margin-left: 8px;
`;

const EditCardMenu = ({ handleDeleteCard, showEditButton }) => {
  return (
    <EditIconWrapper showEditButton={showEditButton}>
      <Dropdown icon="pencil alternate" floating>
        <Dropdown.Menu>
          <Dropdown.Item>Move</Dropdown.Item>
          <Dropdown.Item onClick={() => handleDeleteCard()}>
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </EditIconWrapper>
  );
};

export default EditCardMenu;
