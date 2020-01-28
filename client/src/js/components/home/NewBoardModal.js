import React from "react";

import { Modal } from "semantic-ui-react";
import CreateBoard from "../CreateBoard";

const NewBoardModal = ({
  showNewBoardModal,
  createBoard,
  handleChange,
  handleCreateClick
}) => {
  return (
    <Modal size="tiny" open={createBoard} onClose={() => showNewBoardModal()}>
      <CreateBoard
        handleChange={handleChange}
        handleCreateClick={handleCreateClick}
        buttonText="Create Board"
        fluid={true}
        placeholder="Enter board name..."
      />
    </Modal>
  );
};

export default NewBoardModal;
