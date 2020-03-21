import React, { useContext, useState, memo } from "react";
import styled from "styled-components";

import { BoardContext } from "../../utils/contextUtils";
import BackGroundColors from "./BackGroundColors";
import BoardHeader from "./BoardHeader";
import BoardLists from "./BoardLists";
import BoardMenu from "./BoardMenu";
import ChatSideBar from "./chatSidebar/ChatSideBar";

const BoardWrapper = styled.div`
  height: 100vh;
  overflow-x: scroll;
  padding-left: 7px;
  position: relative;
`;

const Board = () => {
  const { handleColorPick, handleDeleteBoard } = useContext(BoardContext);

  const [openChat, setOpenChat] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const [membersOnline, setMembersOnline] = useState(0);

  const handleChangeColorClick = () => setShowColorPicker(!showColorPicker);
  const handleShowMenuClick = () => setShowSideBar(!showSideBar);
  const handleClose = () => setOpenChat(false);
  const getMembersOnline = users => setMembersOnline(users);

  return (
    <BoardWrapper>
      <BoardHeader handleShowMenuClick={handleShowMenuClick} />

      <BoardLists
        handleChatsOpen={() => setOpenChat(!openChat)}
        membersOnline={membersOnline}
      />

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

      {openChat && (
        <ChatSideBar
          openChat={openChat}
          handleClose={handleClose}
          getMembersOnline={getMembersOnline}
        />
      )}
    </BoardWrapper>
  );
};

export default memo(Board);
