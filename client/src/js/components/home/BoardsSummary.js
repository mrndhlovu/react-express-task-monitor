import React, { useContext, useState } from "react";
import styled from "styled-components";

import { BoardListContext } from "../../utils/contextUtils";
import NewBoardModal from "../sharedComponents/NewBoardModal";
import BoardCategory from "./BoardCategory";
import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";

const StyledContainer = styled.div`
  justify-self: start;
  padding-left: ${props => !props.mobile && "40px"};
  width: 100%;
`;

const BoardsSummary = () => {
  const { makeNewBoard, mobile, loading } = useContext(BoardListContext);

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
    <StyledContainer mobile={mobile}>
      {!loading ? (
        <>
          <BoardCategory
            icon="star"
            header="Starred Boards"
            category="starred"
          />
          <BoardCategory
            icon="clock"
            header="Recently Viewed"
            category="recent"
          />
          <BoardCategory
            icon="user"
            header="Personal Boards"
            category="default"
            showNewBoardModal={showNewBoardModal}
            isDefault={true}
          />
        </>
      ) : (
        <UILoadingSpinner />
      )}

      <NewBoardModal
        showNewBoardModal={showNewBoardModal}
        createBoard={createBoard}
        handleChange={handleChange}
        handleCreateClick={handleCreateClick}
      />
    </StyledContainer>
  );
};

export default BoardsSummary;
