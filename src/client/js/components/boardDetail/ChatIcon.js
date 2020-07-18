import React from "react";
import PropTypes from "prop-types";

import { Users } from "react-feather";

const ChatIcon = ({ handleChatsOpen }) => {
  return <Users className="chat-icon" onClick={handleChatsOpen} />;
};

ChatIcon.propTypes = {
  handleChatsOpen: PropTypes.func.isRequired,
};
export default ChatIcon;
