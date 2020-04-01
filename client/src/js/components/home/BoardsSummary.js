import React, { useContext, useState } from "react";
import styled from "styled-components";

import { MainContext, HomepageContext } from "../../utils/contextUtils";
import NewBoardModal from "../sharedComponents/NewBoardModal";
import BoardCategory from "./BoardCategory";

const StyledContainer = styled.div`
  justify-self: start;
  padding-left: ${props => !props.mobile && "40px"};
  width: 100%;
`;

const BoardsSummary = () => {
  const { makeNewBoard, device, auth } = useContext(MainContext);
  const { boards } = useContext(HomepageContext);
  const hasBoards = boards.length > 0;
  const { user } = auth;

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
        {hasBoards && user.starred.includes(boards[0]._id) && (
          <BoardCategory icon="star" header="Starred Boards" />
        )}
        {hasBoards && user.viewedRecent.includes(boards[0]._id) && (
          <BoardCategory icon="clock" header="Recently Viewed" />
        )}
        <BoardCategory
          icon="user"
          header="Personal Boards"
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
