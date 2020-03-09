import React, { useContext, useState } from "react";
import styled from "styled-components";

import { AppContext, HomepageContext } from "../../utils/contextUtils";
import NewBoardModal from "../sharedComponents/NewBoardModal";
import BoardCategory from "./BoardCategory";

const StyledContainer = styled.div`
  justify-self: start;
  padding-left: ${props => !props.mobile && "40px"};
  width: 100%;
`;

const BoardsSummary = () => {
  const { makeNewBoard, device } = useContext(AppContext);
  const { boards } = useContext(HomepageContext);
  const hasBoards = boards.length > 0;

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
    <StyledContainer mobile={device.mobile}>
      <>
        {hasBoards && boards[0].category.includes("starred") && (
          <BoardCategory
            icon="star"
            header="Starred Boards"
            category="starred"
          />
        )}
        {hasBoards && boards[0].category.includes("recent") && (
          <BoardCategory
            icon="clock"
            header="Recently Viewed"
            category="recent"
          />
        )}
        <BoardCategory
          icon="user"
          header="Personal Boards"
          category="default"
          showNewBoardModal={showNewBoardModal}
          isDefault={true}
          isLast={true}
        />
      </>

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
