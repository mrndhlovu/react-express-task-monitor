import React, { useContext } from "react";
import styled from "styled-components";

import { BoardsContext } from "../../utils/contextUtils";
import BoardLists from "../BoardLists";

const StyledContainer = styled.div`
  display: grid;
`;

const Board = () => {
  const { board, makeBoardUpdate } = useContext(BoardsContext);

  return (
    <StyledContainer>
      {board.dataReceived && (
        <BoardLists board={board.data} makeBoardUpdate={makeBoardUpdate} />
      )}
    </StyledContainer>
  );
};

export default Board;
