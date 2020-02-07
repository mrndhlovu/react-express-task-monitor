import React, { useContext, useState } from "react";
import styled from "styled-components";

import { BoardContext } from "../../utils/contextUtils";
import NewBoardModal from "../sharedComponents/NewBoardModal";
import BoardSection from "./BoardSection";

const StyledContainer = styled.div`
  justify-self: start;
  padding-left: 10px;
  width: 100%;
`;

const BoardsSummary = () => {
  const { makeNewBoard } = useContext(BoardContext);
  const [createBoard, setCreateBoard] = useState(false);
  const [newBoardName, setNewBoardName] = useState(false);

  const showNewBoardModal = () => {
    setCreateBoard(!createBoard);
  };

  const handleChange = e => {
    setNewBoardName(e.target.value);
  };

  const handleCreateClick = () => {
    const body = {
      title: newBoardName
    };

    makeNewBoard(body);
    showNewBoardModal();
  };

  return (
    <StyledContainer>
      <BoardSection icon="star" header="Starred Boards" section="starred" />
      <BoardSection icon="clock" header="Recently Viewed" section="recent" />
      <BoardSection
        icon="user"
        header="Personal Boards"
        section="default"
        showNewBoardModal={showNewBoardModal}
        isDefault={true}
      />

      {createBoard && (
        <NewBoardModal
          showNewBoardModal={showNewBoardModal}
          createBoard={createBoard}
          handleChange={handleChange}
          handleCreateClick={handleCreateClick}
        />
      )}
    </StyledContainer>
  );
};

export default BoardsSummary;
