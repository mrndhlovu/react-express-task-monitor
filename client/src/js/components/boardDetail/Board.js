import React, { useContext, useState } from "react";
import styled from "styled-components";

import { BoardContext } from "../../utils/contextUtils";
import { Sidebar } from "semantic-ui-react";
import BackGroundColors from "./BackGroundColors";
import BoardHeader from "./BoardHeader";
import BoardLists from "./BoardLists";
import BoardMenu from "./BoardMenu";

const BoardWrapper = styled.div`
  background-color: ${props => props.bgColor};
  padding-left: 7px;
`;

const Board = () => {
  const { board, handleColorPick, handleDeleteBoard } = useContext(
    BoardContext
  );
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
      <BoardWrapper className="board" bgColor={board.color}>
        <BoardHeader handleShowMenuClick={handleShowMenuClick} />
        <BoardLists />

        <BoardMenu
          showSideBar={showSideBar}
          handleShowMenuClick={handleShowMenuClick}
          handleChangeColorClick={handleChangeColorClick}
          handleDeleteBoard={handleDeleteBoard}
        />
        <BackGroundColors
          showColorPicker={showColorPicker}
          handleChangeColorClick={handleChangeColorClick}
          handleColorPick={handleColorPick}
        />
      </BoardWrapper>
    </Sidebar.Pushable>
  );
};

export default Board;
