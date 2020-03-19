import React, { useContext, useState, useEffect, useMemo, memo } from "react";
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

const Board = () => {
  const { auth } = useContext(AppContext);
  const { board, handleColorPick, handleDeleteBoard } = useContext(
    BoardContext
  );
  const name = auth.user && getFormattedString(auth.user.fname);

  const [message, setMessage] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [openChats, setOpenChats] = useState(false);
  const [room, setRoom] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [sendMessage, setSendMessage] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

  const socket = useMemo(
    () => socketIOClient(`${getRootUrl()}/chat?name=${name}`),
    [name]
  );

  const handleChangeColorClick = () => setShowColorPicker(!showColorPicker);
  const handleOpenChatSidebar = () => setOpenChats(true);
  const handleShowMenuClick = () => setShowSideBar(!showSideBar);

  const handleSelectRoom = (e, selection) => {
    e.preventDefault();
    setRoom(selection);
  };

  const handleChange = e => {
    e.preventDefault();
    setMessage(e.target.value);
    setIsTyping(true);
  };

  const handleSendChatMessage = e => {
    e.preventDefault();
    setSendMessage(true);
    setIsTyping(false);
  };

  const handleClose = () => {
    setMessage(undefined);
    setOpenChats(false);
    setSendMessage(null);
  };

  useEffect(() => {
    socket.emit("join");
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [socket]);

  useEffect(() => {
    if (!room) return emptyFunction();
    socket.on("message", message => {
      setMessages([...messages, message]);
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [messages, room, socket]);

  useEffect(() => {
    if (!sendMessage) return emptyFunction;
    socket.on("message", message => {
      setMessages([...messages, message]);
    });
    socket.emit("sendMessage", message, error => {
      resetForm("message-field");
    });
    setSendMessage(false);

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [sendMessage, message, messages, socket]);

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
      {auth.user && (
        <ChatSideBar
          openChats={openChats}
          handleChatsOpen={() => handleOpenChatSidebar()}
          handleSend={handleSendChatMessage}
          handleChange={handleChange}
          handleClose={handleClose}
          handleSelectRoom={handleSelectRoom}
          room={room}
          message={message}
          messages={messages}
          name={name}
        />
      )}
    </BoardWrapper>
  );
};

export default memo(Board);
