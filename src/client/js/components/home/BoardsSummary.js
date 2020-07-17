import React, { useState, lazy, Suspense } from "react";
import styled from "styled-components";

import UIContainer from "../sharedComponents/UIContainer";
import { useAuth, useMainContext, useHomeContext } from "../../utils/hookUtils";

const BoardCategory = lazy(() => import("./BoardCategory"));
const NewBoardModal = lazy(() => import("../sharedComponents/NewBoardModal"));

const StyledContainer = styled.div`
  justify-self: start;
  width: 100%;
`;

const BoardsSummary = () => {
  const {
    makeNewBoard,
    device,
    STARRED_BOARDS,
    PERSONAL_BOARDS,
    RECENT_BOARDS,
  } = useMainContext();
  const { boards } = useHomeContext();
  const { user } = useAuth();

  const hasBoards = boards.length > 0;
  const hasStarredBoards = user && user.starred.length !== 0;
  const hasViewRecent = user && user.viewedRecent.length !== 0;

  const [createBoard, setCreateBoard] = useState(false);
  const [newBoardName, setNewBoardName] = useState(false);

  const showNewBoardModal = () => {
    setCreateBoard(!createBoard);
  };

  const handleChange = (e) => {
    setNewBoardName(e.target.value);
  };

  const handleCreateClick = () => {
    const body = {
      title: newBoardName,
    };

    makeNewBoard(body);
    showNewBoardModal();
  };

  return (
    <StyledContainer mobile={device.mobile}>
      <UIContainer>
        <Suspense fallback={<div>Loading...</div>}>
          {hasBoards && hasStarredBoards && (
            <BoardCategory
              icon="star"
              header="Starred Boards"
              starred={true}
              boards={STARRED_BOARDS}
            />
          )}
          {hasBoards && hasViewRecent && (
            <BoardCategory
              icon="clock"
              header="Recently Viewed"
              boards={RECENT_BOARDS}
            />
          )}
          <BoardCategory
            icon="user"
            header="Personal Boards"
            showNewBoardModal={showNewBoardModal}
            isDefault={true}
            isLast={true}
            boards={PERSONAL_BOARDS}
          />
        </Suspense>
      </UIContainer>
      <Suspense fallback={<div>Loading...</div>}>
        <NewBoardModal
          showNewBoardModal={showNewBoardModal}
          createBoard={createBoard}
          handleChange={handleChange}
          handleCreateClick={handleCreateClick}
        />
      </Suspense>
    </StyledContainer>
  );
};

export default BoardsSummary;
