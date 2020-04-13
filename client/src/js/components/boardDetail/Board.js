import React, { useContext, useState, memo } from "react";
import styled from "styled-components";

import { BoardContext, MainContext } from "../../utils/contextUtils";
import BackGroundColors from "./BackGroundColors";
import BoardLists from "./BoardLists";
import BoardMenu from "./BoardMenu";
import ChatSideBar from "./chatSidebar/ChatSideBar";
import ChatIcon from "./ChatIcon";

const BoardWrapper = styled.div`
  height: 100%;
  padding-left: ${(props) => (props.mobile ? "3px" : "7px")};
  position: relative;
  width: 100vw;
`;

const Board = () => {
  const {
    handleColorPick,
    handleDeleteBoard,
    showSideBar,
    handleShowMenuClick,
  } = useContext(BoardContext);
  const { device, showMobileMenu } = useContext(MainContext);

  const [membersOnline, setMembersOnline] = useState(0);
  const [openChat, setOpenChat] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleChangeColorClick = () => setShowColorPicker(!showColorPicker);
  const handleClose = () => setOpenChat(false);
  const getMembersOnline = (users) => setMembersOnline(users);

  return (
    <BoardWrapper mobile={device.mobile}>
      <BoardLists />

      <BoardMenu
        showSideBar={showSideBar || showMobileMenu}
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
      {!openChat && (
        <ChatIcon
          handleChatsOpen={() => setOpenChat(!openChat)}
          mobile={device.mobile}
          membersOnline={membersOnline}
        />
      )}
    </BoardWrapper>
  );
};

export default memo(Board);
