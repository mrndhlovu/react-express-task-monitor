import React, { useContext, useState } from "react";
import styled from "styled-components";

import { BoardContext, AppContext } from "../../utils/contextUtils";
import { Sidebar } from "semantic-ui-react";
import BackGroundColors from "./BackGroundColors";
import BoardHeader from "./BoardHeader";
import BoardLists from "./BoardLists";
import BoardMenu from "./BoardMenu";
import ChatSideBar from "./chatSidebar/ChatSideBar";

const BoardWrapper = styled.div`
  background-color: ${props => props.bgColor};
  padding-left: 7px;
  position: relative;
  height: 100vh;
  overflow-x: scroll;
`;

const Board = () => {
  const { auth } = useContext(AppContext);
  const { board, handleColorPick, handleDeleteBoard } = useContext(
    BoardContext
  );

  const [showSideBar, setShowSideBar] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [openChats, setOpenChats] = useState(false);

  function handleShowMenuClick() {
    setShowSideBar(!showSideBar);
  }

  function handleChangeColorClick() {
    setShowColorPicker(!showColorPicker);
  }

  return (
    <Sidebar.Pushable>
      <BoardWrapper bgColor={board.styleProperties.color}>
        <BoardHeader handleShowMenuClick={handleShowMenuClick} />

        <BoardLists handleChatsOpen={() => setOpenChats(!openChats)} />

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
        {auth && (
          <ChatSideBar
            openChats={openChats}
            handleChatsOpen={() => setOpenChats(!openChats)}
            user={auth.data.fname}
          />
        )}
      </BoardWrapper>
    </Sidebar.Pushable>
  );
};

export default Board;
