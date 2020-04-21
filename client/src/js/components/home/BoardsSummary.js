import React, { useContext, useState } from "react";
import styled from "styled-components";

import { MainContext, HomepageContext } from "../../utils/contextUtils";
import NewBoardModal from "../sharedComponents/NewBoardModal";
import BoardCategory from "./BoardCategory";
import UIContainer from "../sharedComponents/UIContainer";

const StyledContainer = styled.div`
  justify-self: start;
  width: 100%;
`;

const BoardsSummary = () => {
  const { makeNewBoard, device } = useContext(MainContext);
  const { auth, boards } = useContext(HomepageContext);

  const hasBoards = boards.length > 0;
  const hasStarredBoards = auth && auth.user.starred.length !== 0;
  const hasViewRecent = auth && auth.user.viewedRecent.length !== 0;

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
        {hasBoards && hasStarredBoards && (
          <BoardCategory
            icon="star"
            header="Starred Boards"
            category="starred"
          />
        )}
        {hasBoards && hasViewRecent && (
          <BoardCategory
            icon="clock"
            header="Recently Viewed"
            category="recent"
          />
        )}
        <BoardCategory
          icon="user"
          header="Personal Boards"
          showNewBoardModal={showNewBoardModal}
          isDefault={true}
          isLast={true}
          category="default"
        />
      </UIContainer>

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
