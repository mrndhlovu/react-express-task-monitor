import React, { useContext, useState } from "react";
import styled from "styled-components";

import BoardLists from "./BoardLists";
import BoardHeader from "../home/BoardHeader";
import { BoardContext } from "../../utils/contextUtils";
import RightBoardMenu from "./RightBoardMenu";
import { Sidebar } from "semantic-ui-react";
import BackGroundColors from "./BackGroundColors";

const BoardWrapper = styled.div`
  background-color: ${props => props.bgColor};
  padding-left: 10px;
`;

const Board = () => {
  const { board, handleColorPick } = useContext(BoardContext);
  const [showSideBar, setShowSideBar] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  function handleShowMenuClick() {
    setShowSideBar(!showSideBar);
  }

  function handleChangeColorClick() {
    setShowColorPicker(!showColorPicker);
  }

  return (
    <Sidebar.Pushable>
      <BoardWrapper bgColor={board.color}>
        <BoardHeader handleShowMenuClick={handleShowMenuClick} />
        {showSideBar && (
          <RightBoardMenu
            showSideBar={showSideBar}
            handleShowMenuClick={handleShowMenuClick}
            handleChangeColorClick={handleChangeColorClick}
          />
        )}
        {showColorPicker && (
          <BackGroundColors
            showColorPicker={showColorPicker}
            handleChangeColorClick={handleChangeColorClick}
            handleColorPick={handleColorPick}
          />
        )}
        <BoardLists />
      </BoardWrapper>
    </Sidebar.Pushable>
  );
};

export default Board;
