import React from "react";
import styled from "styled-components";

import { Icon } from "semantic-ui-react";

const Container = styled.div`
  position: absolute;
  bottom: 4%;
  right: 1%;
`;

const ChatIcon = ({ handleChatsOpen }) => {
  return (
    <Container>
      <Icon
        circular
        size="large"
        name="users"
        link
        open
        onClick={handleChatsOpen}
      />
    </Container>
  );
};

export default ChatIcon;
