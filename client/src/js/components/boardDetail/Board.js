import React, { useContext } from "react";
import styled from "styled-components";

import { BoardsContext } from "../../utils/contextUtils";
import BoardLists from "./BoardLists";

const StyledContainer = styled.div`
  display: grid;
`;

const Board = () => {
  const { board, makeBoardUpdate } = useContext(BoardsContext);

  return (
    <StyledContainer>
      <BoardLists
        board={board.data}
        makeBoardUpdate={makeBoardUpdate}
        dataReceived={board.dataReceived}
      />
    </StyledContainer>
  );
};

export default Board;
