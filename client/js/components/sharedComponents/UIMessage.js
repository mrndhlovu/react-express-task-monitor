import React from "react";

import { Message } from "semantic-ui-react";

const UIMessage = ({
  message,
  success = false,
  error = false,
  handleDismiss,
  list,
}) => {
  return (
    <Message
      className="message-box"
      floating
      header={message}
      positive={success}
      negative={error}
      onDismiss={handleDismiss}
      size="tiny"
      list={list}
    />
  );
};

export default UIMessage;
