import React, { useContext, useState, memo } from "react";
import styled from "styled-components";

import { Sidebar } from "semantic-ui-react";

import { BoardContext, MainContext } from "../../utils/contextUtils";
import BackGroundColors from "./BackGroundColors";
import BoardLists from "./BoardLists";
import BoardMenu from "./BoardMenu";
import ChatSideBar from "./chatSidebar/ChatSideBar";
import ChatIcon from "./ChatIcon";

const BoardWrapper = styled.div`
  padding-left: ${(props) => (props.mobile ? "3px" : "7px")};
  position: relative;
  width: 100vw;
  margin-top: ${(props) => !props.mobile && "37px"};
`;

const Board = () => {
  const {
    handleSelectedColor,
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
      <Sidebar.Pushable>
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
          handleSelectedColor={handleSelectedColor}
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
      </Sidebar.Pushable>
    </BoardWrapper>
  );
};

export default memo(Board);