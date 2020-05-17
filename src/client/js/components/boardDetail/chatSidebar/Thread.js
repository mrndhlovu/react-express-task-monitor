import React, { memo } from "react";
import styled from "styled-components";
import ReactEmoji from "react-emoji";

import { Comment, Icon } from "semantic-ui-react";
import { getFormattedDate } from "../../../utils/appUtils";
import UIDivider from "../../sharedComponents/UIDivider";

const Message = styled.div`
  background-color: ${(props) =>
    props.isCurrentUserMessage ? "white" : "#1c1c57"};
  border-radius: 2px;
  overflow-wrap: break-word;
  padding: 6px;
  color: ${(props) => (props.isCurrentUserMessage ? "black" : "white")};

}
`;

const StyledSpan = styled.span`
  font-size: 10px;
`;

const Thread = ({ message, isCurrentUserMessage }) => {
  return (
    <div>
      <UIDivider
        horizontal={true}
        inverted={true}
        content={
          <StyledSpan className="thread-time">
            {getFormattedDate(message.time, null, true)}
          </StyledSpan>
        }
      />
      <Message isCurrentUserMessage={isCurrentUserMessage}>
        <Comment>
          <Comment.Content>
            <Comment.Author>
              <Icon circular name="user" color="green" />
              {message.user}{" "}
              <StyledSpan isCurrentUserMessage={isCurrentUserMessage}>
                {getFormattedDate(message.date, "LT")}
              </StyledSpan>
            </Comment.Author>
            <Comment.Text>{ReactEmoji.emojify(message.text)}</Comment.Text>
          </Comment.Content>
        </Comment>
      </Message>
    </div>
  );
};

export default memo(Thread);
