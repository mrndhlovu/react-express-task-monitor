import React, { useContext, useState, memo, lazy, Suspense } from "react";
import styled from "styled-components";

import { Sidebar } from "semantic-ui-react";

import { BoardContext, MainContext } from "../../utils/contextUtils";

const ChangeBackGround = lazy(() => import("./ChangeBackGround"));
const BoardLists = lazy(() => import("./BoardLists"));
const BoardMenu = lazy(() => import("./BoardMenu"));
const ChatIcon = lazy(() => import("./ChatIcon"));
const ChatSideBar = lazy(() => import("./chatSidebar/ChatSideBar"));

import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";
import AboutBoard from "./AboutBoard";

const BoardWrapper = styled.div`
  padding-left: ${(props) => (props.mobile ? "3px" : "7px")};
  position: relative;
  width: 100vw;
`;

const Board = () => {
  const {
    handleDeleteBoard,
    handleSelectedBackground,
    handleShowMenuClick,
    showSideBar,
  } = useContext(BoardContext);
  const { device, showMobileMenu } = useContext(MainContext);

  const [membersOnline, setMembersOnline] = useState(0);
  const [openChat, setOpenChat] = useState(false);
  const [changeBg, setChangeBg] = useState(false);
  const [showAboutCard, setShowAboutCard] = useState(false);

  const toggleChangeBg = () => setChangeBg(!changeBg);
  const handleClose = () => setOpenChat(false);
  const getMembersOnline = (users) => setMembersOnline(users);

  return (
    <BoardWrapper className="board-wrap" mobile={device.mobile}>
      <Sidebar.Pushable>
        <Suspense fallback={<UILoadingSpinner />}>
          <BoardLists />
        </Suspense>
        <Suspense fallback={<UILoadingSpinner />}>
          <BoardMenu
            showSideBar={showSideBar || showMobileMenu}
            handleShowMenuClick={handleShowMenuClick}
            toggleChangeBg={toggleChangeBg}
            setShowAboutCard={() => setShowAboutCard(!showAboutCard)}
            handleDeleteBoard={handleDeleteBoard}
          />
        </Suspense>
        <Suspense fallback={<UILoadingSpinner />}>
          <ChangeBackGround
            changeBg={changeBg}
            toggleChangeBg={toggleChangeBg}
            handleSelectedBackground={handleSelectedBackground}
          />
        </Suspense>

        <Suspense fallback={<UILoadingSpinner />}>
          <AboutBoard
            setShowAboutCard={() => setShowAboutCard(!showAboutCard)}
            showAboutCard={showAboutCard}
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
              membersOnline={membersOnline}
            />
          </Suspense>
        )}
      </Sidebar.Pushable>
    </BoardWrapper>
  );
};

export default memo(Board);
