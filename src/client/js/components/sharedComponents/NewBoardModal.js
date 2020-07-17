import React from "react";
import styled from "styled-components";

import CreateInput from "./CreateInput";
import UIModal from "./UIModal";

const StyledDiv = styled.div`
  background-color: #ebecf0;
  padding: 9px 9px;
  border-radius: 3px;
`;

const NEW_BOARD_MODAL_STYLE = {
  backgroundColor: "transparent",
  border: "none",
  display: "flex",
  justifyContent: "space-around",
  position: "absolute",
  top: "4%",
  bottom: "",
};

const NewBoardModal = ({
  createBoard,
  handleChange,
  createItemClickHandler,
  showNewBoardModal,
}) => {
  return (
    <UIModal
      className="board-modal"
      isOpen={createBoard}
      bgColor="transparent"
      modalStyle={NEW_BOARD_MODAL_STYLE}
    >
      <StyledDiv>
        <CreateInput
          placeholder="Add board title"
          buttonText="Create Board"
          createItemClickHandler={createItemClickHandler}
          close={() => showNewBoardModal()}
          handleChange={handleChange}
        />
      </StyledDiv>
    </UIModal>
  );
};

export default NewBoardModal;
