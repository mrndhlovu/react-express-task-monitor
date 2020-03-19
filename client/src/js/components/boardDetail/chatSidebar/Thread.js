import React from "react";
import styled from "styled-components";
import moment from "moment";

import { Comment, Divider } from "semantic-ui-react";

const Message = styled.div`
  padding: 6px;
  background-color: ${props => (props.owner ? "#bcbdbd" : "#879594")};
  border-radius: 2px;
  overflow-wrap: break-word;
`;

const StyledSpan = styled.span`
  font-size: 10px;
  color: #fffff3d;
`;

const Thread = ({ avatar, message, owner }) => {
  console.log("message: ", message);
  return (
    <div>
      <Divider
        horizontal
        inverted
        content={moment(message.date).format("MMM Do YY")}
      />
      <Message color={owner ? "olive" : "red"} owner={owner}>
        <Comment>
          <Comment.Avatar as="a" src={avatar} />
          <Comment.Content>
            <Comment.Author>
              {message.user}{" "}
              <StyledSpan>{moment(message.date).format("LT")}</StyledSpan>
            </Comment.Author>
            <Comment.Text>{message.text}</Comment.Text>
          </Comment.Content>
        </Comment>
      </Message>
    </div>
  );
};

export default Thread;
