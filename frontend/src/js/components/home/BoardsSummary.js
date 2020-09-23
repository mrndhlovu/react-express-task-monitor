import React, { useState, lazy, Suspense } from "react";
import styled from "styled-components";

import UIContainer from "../shared/UIContainer";
import { useAuth, useMainContext } from "../../utils/hookUtils";

const BoardCategory = lazy(() => import("./BoardCategory"));
const NewBoardModal = lazy(() => import("../shared/NewBoardModal"));

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
    boards,
  } = useMainContext();
  const { user } = useAuth();

  const hasBoards = boards.length > 0;
  const hasStarredBoards = user && user.starred.length !== 0;
  const hasViewRecent = user && user.viewedRecent.length !== 0;

  const [createBoard, setCreateBoard] = useState(false);
  const [newBoardName, setNewBoardName] = useState(false);

  const openCreateBoardModalHandler = () => setCreateBoard(!createBoard);

  const handleChange = (e) => setNewBoardName(e.target.value);

  const createItemClickHandler = () => {
    const body = {
      title: newBoardName,
    };

    makeNewBoard(body);
    openCreateBoardModalHandler();
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
            openCreateBoardModalHandler={openCreateBoardModalHandler}
            isDefault={true}
            isLast={true}
            boards={PERSONAL_BOARDS}
          />
        </Suspense>
      </UIContainer>
      <Suspense fallback={<div>Loading...</div>}>
        <NewBoardModal
          openCreateBoardModalHandler={openCreateBoardModalHandler}
          createBoard={createBoard}
          handleChange={handleChange}
          createItemClickHandler={createItemClickHandler}
        />
      </Suspense>
    </StyledContainer>
  );
};

export default BoardsSummary;
