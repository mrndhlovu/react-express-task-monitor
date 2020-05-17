import React from "react";

import { Icon } from "semantic-ui-react";

const ChatIcon = ({ handleChatsOpen }) => {
  return (
    <Icon
      className="chat-icon"
      circular
      name="users"
      onClick={handleChatsOpen}
    />
  );
};

export default ChatIcon;
