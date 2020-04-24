import React, {
  useEffect,
  useMemo,
  useContext,
  useState,
  useCallback,
  Fragment,
} from "react";
import { withRouter } from "react-router-dom";
import socketIOClient from "socket.io-client";
import styled from "styled-components";

import { TextArea, Form } from "semantic-ui-react";

import {
  resetForm,
  emptyFunction,
  getFormattedString,
} from "../../../utils/appUtils";
import { BoardContext } from "../../../utils/contextUtils";
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

const ChatSideBar = ({ openChat }) => {
  const { fname } = useContext(BoardContext).auth.data.data;
  const { board, handleBoardUpdate } = useContext(BoardContext);
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

  const handleChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const handleSendChatMessage = (e) => {
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

  const saveMessage = useCallback(
    (newMessage, room) => {
      console.log("newMessage: ", newMessage);
      if (newMessage.room) {
        board.comments.push({ ...newMessage });
        handleBoardUpdate(board, "comments");
      }
      return setMessages([...messages, { ...newMessage, room }]);
    },
    [board, handleBoardUpdate, messages]
  );

  useEffect(() => {
    if (board.comments.length === 0) return emptyFunction();
    setMessages([...board.comments]);
  }, [board.comments]);

  useEffect(() => {
    if (!socket) return emptyFunction();
    socket.on("message", (newMessage) => {
      saveMessage(newMessage, room);
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [messages, socket, message, room, saveMessage]);

  useEffect(() => {
    if (!socket) return emptyFunction();
    socket.on("roomData", (data) => setOnlineCount(data.users.length));
  }, [socket]);

  useEffect(() => {
    if (!sendMessage) return emptyFunction;

    socket.emit("sendMessage", message, (error) => {
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
      className="chat-sidebar"
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
        <Fragment>
          <FormWrapper>
            <Form id="chat-form">
              <TextArea
                id="message-field"
                onChange={(e) => handleChange(e)}
                onKeyDown={(e) =>
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
              {messages.map(
                (message, index) =>
                  message.room === room && (
                    <Thread
                      key={index}
                      isCurrentUserMessage={message.user === name}
                      message={message}
                    />
                  )
              )}
            </BoardMessages>
          </InputWrapper>
        </Fragment>
      )}
    </SideBarWrapper>
  );
};

export default withRouter(ChatSideBar);
