import React, { useContext, useState, lazy, Suspense } from "react";
import styled from "styled-components";

import { MainContext, HomepageContext } from "../../utils/contextUtils";

import UIContainer from "../sharedComponents/UIContainer";
const BoardCategory = lazy(() => import("./BoardCategory"));
const NewBoardModal = lazy(() => import("../sharedComponents/NewBoardModal"));

const StyledContainer = styled.div`
  justify-self: start;
  width: 100%;
`;

const BoardsSummary = () => {
  const { makeNewBoard, device } = useContext(MainContext);
  const { boards, user } = useContext(HomepageContext);

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
            <BoardCategory icon="star" header="Starred Boards" starred={true} />
          )}
          {hasBoards && hasViewRecent && (
            <BoardCategory
              icon="clock"
              header="Recently Viewed"
              viewedRecent={true}
            />
          )}
          <BoardCategory
            icon="user"
            header="Personal Boards"
            showNewBoardModal={showNewBoardModal}
            isDefault={true}
            isLast={true}
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
