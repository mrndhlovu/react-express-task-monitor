import React from "react";
import moment from "moment";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { TextArea, Form, Divider } from "semantic-ui-react";
import SideBarWrapper from "../../sharedComponents/SideBarWrapper";
import Thread from "./Thread";
import RoomSelector from "./RoomSelector";

const InputWrapper = styled.div`
  position: absolute;
  bottom: 4%;
  padding: 0px 17px 0 0;
  width: 100%;
`;

const BoardThread = styled.div``;

const ChatSideBar = ({
  openChats,
  handleChange,
  handleSend,
  handleClose,
  room,
  handleSelectRoom
}) => {
  return (
    <SideBarWrapper
      open={openChats}
      handleClose={() => handleClose()}
      header="Comments"
      inverted={true}
      width="very wide"
    >
      <Divider
        horizontal
        inverted={true}
        content={moment(Date.now()).format("LLL")}
      />
      <RoomSelector handleSelectRoom={handleSelectRoom} room={room} />
      {room && (
        <InputWrapper>
          <BoardThread>
            <Thread />
            <Thread owner={true} />
          </BoardThread>
          <Form id="chat-form">
            <TextArea
              onChange={e => handleChange(e)}
              onKeyDown={e => (e.key === "Enter" ? handleSend(e) : null)}
              placeholder="Message"
              rows={2}
              type="text"
            />
          </Form>
          <Divider />
        </InputWrapper>
      )}
    </SideBarWrapper>
  );
};

export default withRouter(ChatSideBar);
