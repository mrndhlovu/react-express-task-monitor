import React from "react";
import styled from "styled-components";

import { Modal } from "semantic-ui-react";
import CreateInput from "./CreateInput";

const StyledDiv = styled.div`
  display: grid;

  background-color: #ebecf0;
  padding: 9px 9px;
  max-width: 300px;

  &:.ui.tiny.modal {
    width: 300px !important;
  }
`;

const NewBoardModal = ({
  createBoard,
  handleChange,
  handleCreateClick,
  showNewBoardModal
}) => {
  return (
    <Modal
      className="board-modal"
      centered={false}
      size="tiny"
      open={createBoard}
    >
      <StyledDiv>
        <CreateInput
          placeholder="Add board title"
          buttonText="Create Board"
          handleCreateClick={handleCreateClick}
          close={() => showNewBoardModal()}
          handleChange={handleChange}
        />
      </StyledDiv>
    </Modal>
  );
};

export default NewBoardModal;
