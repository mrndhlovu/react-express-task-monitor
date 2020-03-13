import React from "react";
import styled from "styled-components";

import { Button } from "semantic-ui-react";

const Container = styled.div`
  position: absolute;
  bottom: 4%;
  right: 1%;
`;

const StyledSpan = styled.span`
&:after{
  content:'${props => props.count}';
  color: red; 
  font-size: 12px;
  letter-spacing: 2px;
  padding-left: 10px;
}
`;

const ChatIcon = ({ viewingCount = 11, handleChatsOpen }) => {
  return (
    <Container>
      <Button
        circular
        content={<StyledSpan count={viewingCount}> </StyledSpan>}
        icon="users"
        open
        onClick={handleChatsOpen}
      />
    </Container>
  );
};

export default ChatIcon;
