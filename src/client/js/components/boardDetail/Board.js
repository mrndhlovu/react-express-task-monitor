import React, { useContext, useState, memo, lazy, Suspense } from "react";
import styled from "styled-components";

import { Sidebar } from "semantic-ui-react";

import { BoardContext, MainContext } from "../../utils/contextUtils";

const BackGroundColors = lazy(() => import("./BackGroundColors"));
const BoardLists = lazy(() => import("./BoardLists"));
const BoardMenu = lazy(() => import("./BoardMenu"));
const ChatIcon = lazy(() => import("./ChatIcon"));
const ChatSideBar = lazy(() => import("./chatSidebar/ChatSideBar"));

import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";

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
        <Suspense fallback={<UILoadingSpinner />}>
          <BoardLists />
        </Suspense>
        <Suspense fallback={<UILoadingSpinner />}>
          <BoardMenu
            showSideBar={showSideBar || showMobileMenu}
            handleShowMenuClick={handleShowMenuClick}
            handleChangeColorClick={handleChangeColorClick}
            handleDeleteBoard={handleDeleteBoard}
          />
        </Suspense>
        <Suspense fallback={<UILoadingSpinner />}>
          <BackGroundColors
            showColorPicker={showColorPicker}
            handleChangeColorClick={handleChangeColorClick}
            handleSelectedColor={handleSelectedColor}
          />
        </Suspense>
        {openChat && (
          <Suspense fallback={<UILoadingSpinner />}>
            <ChatSideBar
              openChat={openChat}
              handleClose={handleClose}
              getMembersOnline={getMembersOnline}
            />
          </Suspense>
        )}
        {!openChat && (
          <Suspense fallback={<UILoadingSpinner />}>
            <ChatIcon
              handleChatsOpen={() => setOpenChat(!openChat)}
              mobile={device.mobile}
              membersOnline={membersOnline}
            />
          </Suspense>
        )}
      </Sidebar.Pushable>
    </BoardWrapper>
  );
};

export default memo(Board);
