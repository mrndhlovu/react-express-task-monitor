import React, { useContext, useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import socketIOClient from "socket.io-client";

import { BoardContext, AppContext } from "../../utils/contextUtils";
import { getRootUrl } from "../../utils/urls";
import {
  resetForm,
  emptyFunction,
  getFormattedString
} from "../../utils/appUtils";
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

let socket;

const Board = () => {
  const { auth } = useContext(AppContext);
  const { board, handleColorPick, handleDeleteBoard } = useContext(
    BoardContext
  );
  const name = auth.data && getFormattedString(auth.data.fname);

  const [message, setMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [openChats, setOpenChats] = useState(true);
  const [room, setRoom] = useState(null);
  const [send, setSend] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

  const SOCKET_ENDPOINT = `${getRootUrl()}?name=${name}&room=${room}`;

  socket = socketIOClient(SOCKET_ENDPOINT);

  const handleChangeColorClick = () => setShowColorPicker(!showColorPicker);
  const handleOpenChatSidebar = () => setOpenChats(true);
  const handleSelectRoom = selection => setRoom(selection);
  const handleShowMenuClick = () => setShowSideBar(!showSideBar);

  const handleChange = e => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const handleSendChatMessage = e => {
    e.preventDefault();
    setSend(true);
    setMessages([...messages, message]);
    resetForm("chat-form");
  };

  const handleClose = () => {
    setMessage(null);
    setOpenChats(false);
    setSend(null);
  };

  useEffect(() => {
    if (!room) return emptyFunction();

    socket.emit("join", () => console.log("Connection live"));
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [room]);

  useEffect(() => {
    if (!send) return emptyFunction;

    socket.emit("sendMessage", message, () => setSend(false));
  }, [messages, send, message]);

  console.log(message, messages);

  return (
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
      {auth.data && (
        <ChatSideBar
          openChats={openChats}
          handleChatsOpen={() => handleOpenChatSidebar()}
          handleSend={handleSendChatMessage}
          handleChange={handleChange}
          handleClose={handleClose}
          handleSelectRoom={handleSelectRoom}
          room={room}
        />
      )}
    </BoardWrapper>
  );
};

export default Board;
