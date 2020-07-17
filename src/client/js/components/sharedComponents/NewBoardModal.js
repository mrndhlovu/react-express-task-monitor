import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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
  openCreateBoardModalHandler,
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
          close={() => openCreateBoardModalHandler()}
          handleChange={handleChange}
        />
      </StyledDiv>
    </UIModal>
  );
};

NewBoardModal.propTypes = {
  createBoard: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  createItemClickHandler: PropTypes.func.isRequired,
  openCreateBoardModalHandler: PropTypes.func.isRequired,
};

export default NewBoardModal;
