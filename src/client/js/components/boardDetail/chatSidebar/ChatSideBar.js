import React, {
  useEffect,
  useMemo,
  useContext,
  useState,
  useCallback,
  Fragment,
  Suspense,
  lazy,
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
import { useAuth } from "../../../utils/hookUtils";

import SideBarWrapper from "../../sharedComponents/SideBarWrapper";
import UIMessage from "../../sharedComponents/UIMessage";
import UILoadingSpinner from "../../sharedComponents/UILoadingSpinner";

const RoomSelector = lazy(() => import("./RoomSelector"));
const Thread = lazy(() => import("./Thread"));

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

const ChatSideBar = ({ openChat, handleClose }) => {
  const { fname } = useAuth().user;
  const { board, boardUpdateHandler } = useContext(BoardContext);
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
      if (newMessage.room) {
        board.comments.push({ ...newMessage });
        boardUpdateHandler(board, "comments");
      }
      return setMessages([...messages, { ...newMessage, room }]);
    },
    [board, boardUpdateHandler, messages]
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
      handleClose={() => handleClose()}
      header="Comments"
      inverted={true}
      className="chat-sidebar"
    >
      <Suspense fallback={<UILoadingSpinner />}>
        <RoomSelector
          handleSelectRoom={handleSelectRoom}
          room={room}
          onlineCount={onlineCount}
        />
      </Suspense>
      {error && (
        <UIMessage
          message={error}
          error={true}
          handleDismiss={() => setError(null)}
        />
      )}
      {room && (
        <Fragment>
          <Suspense fallback={<UILoadingSpinner />}>
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
          </Suspense>
        </Fragment>
      )}
    </SideBarWrapper>
  );
};

export default withRouter(ChatSideBar);
