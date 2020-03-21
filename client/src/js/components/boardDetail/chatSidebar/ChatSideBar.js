import React, { useEffect, useMemo, useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import socketIOClient from "socket.io-client";
import styled from "styled-components";
import ScrollToBottom from "react-scroll-to-bottom";

import { TextArea, Form } from "semantic-ui-react";

import {
  resetForm,
  emptyFunction,
  getFormattedString
} from "../../../utils/appUtils";
import { AppContext } from "../../../utils/contextUtils";
import { getRootUrl } from "../../../utils/urls";
import RoomSelector from "./RoomSelector";
import SideBarWrapper from "../../sharedComponents/SideBarWrapper";
import Thread from "./Thread";
import MessageAlert from "../../sharedComponents/MessageAlert";

const InputWrapper = styled.div`
  width: 100%;
  overflow-y: auto;
`;

const BoardMessages = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

const FormWrapper = styled.div`
  margin-bottom: 10px;
  width: 100%;
`;

const ChatSideBar = ({ handleClose, openChat }) => {
  const { fname } = useContext(AppContext).auth.user;
  const name = getFormattedString(fname);

  const [message, setMessage] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState(null);
  const [sendMessage, setSendMessage] = useState(false);
  const [onlineCount, setOnlineCount] = useState(0);
  const [error, setError] = useState(null);

  const socket = useMemo(
    () =>
      room && socketIOClient(`${getRootUrl()}/chat?name=${name}&room=${room}`),
    [name, room]
  );

  const handleSelectRoom = (e, selection) => {
    e.preventDefault();
    setRoom(selection);
  };

  const handleChange = e => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const handleSendChatMessage = e => {
    e.preventDefault();
    setSendMessage(true);
  };

  useEffect(() => {
    if (!room) return emptyFunction();
    socket.emit("join");

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [socket, room]);

  useEffect(() => {
    if (!socket) return emptyFunction();
    socket.on("message", newMessage => setMessages([...messages, newMessage]));
  }, [messages, socket, message]);

  useEffect(() => {
    if (!socket) return emptyFunction();
    socket.on("roomData", data => setOnlineCount(data.users.length));
  }, [socket]);

  useEffect(() => {
    if (!sendMessage) return emptyFunction;

    socket.emit("sendMessage", message, error => {
      if (error) setError(error);
      resetForm("message-field");
    });

    setSendMessage(false);
  }, [sendMessage, message, messages, socket]);

  return (
    <SideBarWrapper
      open={openChat}
      handleClose={() => window.location.reload()}
      header="Comments"
      inverted={true}
      width="very wide"
    >
      <RoomSelector
        handleSelectRoom={handleSelectRoom}
        room={room}
        onlineCount={onlineCount}
      />
      {error && (
        <MessageAlert
          message={error}
          open={true}
          close={() => setError(null)}
        />
      )}
      {room && (
        <>
          <FormWrapper>
            <Form id="chat-form">
              <TextArea
                id="message-field"
                onChange={e => handleChange(e)}
                onKeyDown={e =>
                  e.key === "Enter" ? handleSendChatMessage(e) : null
                }
                placeholder="Message"
                rows={2}
                type="text"
              />
            </Form>
          </FormWrapper>
          <InputWrapper>
            <BoardMessages>
              <ScrollToBottom className="messagesContainer">
                {messages.map((message, index) => (
                  <Thread
                    key={index}
                    isCurrentUserMessage={message.user === name}
                    message={message}
                  />
                ))}
              </ScrollToBottom>
            </BoardMessages>
          </InputWrapper>
        </>
      )}
    </SideBarWrapper>
  );
};

export default withRouter(ChatSideBar);
