import React from "react";
import styled from "styled-components";

import RightBoardButtons from "./RightBoardButtons";
import LeftBoardButtons from "./LeftBoardButtons";

const StyledHeader = styled.div`
  padding: 5px 0 10px 5px;
  min-height: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const BoardHeader = ({ boardTitle }) => {
  return (
    <StyledHeader>
      <LeftBoardButtons boardTitle={boardTitle} />
      <RightBoardButtons />
    </StyledHeader>
  );
};

export default BoardHeader;
