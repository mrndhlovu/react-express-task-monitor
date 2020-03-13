import React from "react";
import moment from "moment";
import styled from "styled-components";

import { TextArea, Form, Button, Divider } from "semantic-ui-react";
import SideBarWrapper from "../../sharedComponents/SideBarWrapper";
import Thread from "./Thread";

const InputWrapper = styled.div`
  position: absolute;
  bottom: 4%;
  padding: 0px 17px 0 0;
  width: 100%;
`;

const BoardThread = styled.div``;

const ChatSideBar = ({ handleChatsOpen, openChats, user, chats }) => {
  return (
    <SideBarWrapper
      open={openChats}
      handleClose={handleChatsOpen}
      header="Comments"
      inverted={true}
      width="very wide"
    >
      <Divider
        horizontal
        inverted={true}
        content={moment(Date.now()).format("LLL")}
      />
      <InputWrapper>
        <BoardThread>
          <Thread />
          <Thread owner={true} />
        </BoardThread>
        <Form>
          <TextArea rows={2} placeholder="Tell us more" />
        </Form>
        <Divider />
        <Button positive size="tiny" content="Send" />
      </InputWrapper>
    </SideBarWrapper>
  );
};

export default ChatSideBar;
