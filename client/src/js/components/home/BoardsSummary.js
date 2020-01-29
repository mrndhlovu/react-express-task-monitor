import React, { useContext, useState } from "react";

import { Container } from "semantic-ui-react";
import { BoardsContext } from "../../utils/contextUtils";
import BoardSummary from "./BoardSummary";
import styled from "styled-components";
import CreateNewBoard from "../sharedComponents/CreateNewBoard";
import NewBoardModal from "../sharedComponents/NewBoardModal";

const StyledContainer = styled.div`
  justify-self: start;
  padding-left: 50px;
  width: 100%;
`;

const BoardsSummary = () => {
  const { boards, history, makeNewBoard } = useContext(BoardsContext);
  const [createBoard, setCreateBoard] = useState(false);
  const [newBoardName, setNewBoardName] = useState(false);

  const data = boards.dataReceived ? boards.data : [];

  const showNewBoardModal = () => {
    setCreateBoard(!createBoard);
  };

  const handleChange = e => {
    setNewBoardName(e.target.value);
  };

  const handleCreateClick = () => {
    const body = {
      title: newBoardName,
      list: []
    };

    makeNewBoard(body);
    showNewBoardModal();
  };

  return (
    <StyledContainer>
      <Container>
        {data.map(key => (
          <BoardSummary
            key={key._id}
            id={key._id}
            header={key.title}
            history={history}
          />
        ))}

        <CreateNewBoard showNewBoardModal={showNewBoardModal} />
      </Container>
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
