import React, { useContext } from "react";
import styled from "styled-components";

import RightBoardButtons from "./RightBoardButtons";
import LeftBoardButtons from "./LeftBoardButtons";
import { BoardContext } from "../../utils/contextUtils";

const StyledHeader = styled.div`
  padding: 5px 0 5px 5px;
  min-height: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const BoardHeader = ({ handleShowMenuClick }) => {
  const { board } = useContext(BoardContext);
  return (
    <StyledHeader>
      <LeftBoardButtons boardTitle={board.title} />
      <RightBoardButtons handleShowMenuClick={handleShowMenuClick} />
    </StyledHeader>
  );
};

export default BoardHeader;
