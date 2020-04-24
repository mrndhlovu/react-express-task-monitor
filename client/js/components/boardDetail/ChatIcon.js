import React from "react";
import styled from "styled-components";

import { Icon } from "semantic-ui-react";

const Container = styled.div`
  position: absolute;
  bottom: ${(props) => (props.mobile ? "0%" : "1%")};
  right: 1%;
  position: fixed;
  z-index: 100;
`;

const ChatIcon = ({ handleChatsOpen, mobile }) => {
  return (
    <Container mobile={mobile}>
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
