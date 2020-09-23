import React, { useState, memo, lazy, Suspense } from "react";
import styled from "styled-components";

import { ALLOWED_TEMPLATE_FIELDS } from "../../constants/constants";
import { requestCreateTemplate } from "../../apis/apiRequests";
import { useMainContext, useBoardContext } from "../../utils/hookUtils";
import AboutBoard from "./AboutBoard";
import BoardHeader from "./BoardHeader";
import UILoadingSpinner from "../shared/UILoadingSpinner";

const ChangeBackGround = lazy(() => import("./ChangeBackGround"));
const BoardLists = lazy(() => import("./BoardLists"));
const BoardMenu = lazy(() => import("./BoardMenu"));
const ChatIcon = lazy(() => import("./ChatIcon"));
const ChatSideBar = lazy(() => import("./chatSidebar/ChatSideBar"));

const Container = styled.div`
  margin-left: 5px;
  position: relative;
  width: 100vw;
  height: 90vh;
  margin-top: 5vh;
`;

const Board = () => {
  const {
    handleDeleteBoard,
    bgColorSelectHandler,
    handleShowMenuClick,
    showSideBar,
    board,
    history,
  } = useBoardContext();
  const { device, alertUser } = useMainContext();
  const [membersOnline, setMembersOnline] = useState(0);
  const [openChat, setOpenChat] = useState(false);
  const [changeBg, setChangeBg] = useState(false);
  const [showAboutCard, setShowAboutCard] = useState(false);

  const toggleChangeBg = () => setChangeBg(!changeBg);
  const handleClose = () => setOpenChat(false);
  const getMembersOnline = (users) => setMembersOnline(users);

  const handleMakeTemplate = () => {
    let template = { ...board, isTemplate: true };

    Object.keys(template).filter(
      (field) =>
        !ALLOWED_TEMPLATE_FIELDS.includes(field) && delete template[field]
    );

    template.lists.map((list) => {
      delete list._id;
      return delete list.cards;
    });

    const createTemplate = async () => {
      await requestCreateTemplate({ template })
        .then((res) => history.push(`/boards/id/${res.data._id}`))
        .catch((error) => alertUser(error.response?.data));
    };
    createTemplate();
  };

  return (
    <>
      <BoardHeader />
      <Container className="board-wrap" mobile={device.mobile}>
        <Suspense fallback={<UILoadingSpinner />}>
          <BoardLists />
        </Suspense>
        <Suspense fallback={<UILoadingSpinner />}>
          <BoardMenu
            showSideBar={showSideBar}
            handleShowMenuClick={handleShowMenuClick}
            toggleChangeBg={toggleChangeBg}
            handleMakeTemplate={handleMakeTemplate}
            setShowAboutCard={() => setShowAboutCard(!showAboutCard)}
            handleDeleteBoard={handleDeleteBoard}
          />
        </Suspense>
        <Suspense fallback={<UILoadingSpinner />}>
          <ChangeBackGround
            changeBg={changeBg}
            toggleChangeBg={toggleChangeBg}
            bgColorSelectHandler={bgColorSelectHandler}
            handleMakeTemplate={handleMakeTemplate}
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
      </Container>
    </>
  );
};

export default memo(Board);
