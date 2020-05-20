import React from "react";

import { Message } from "semantic-ui-react";

const UIMessage = ({
  message,
  success = false,
  error = false,
  handleDismiss,
  list,
  dataTestId,
}) => {
  return (
    <Message
      className="message-box"
      floating
      header={message}
      positive={success}
      negative={error}
      onDismiss={handleDismiss}
      data-test-id={dataTestId || "notification"}
      size="tiny"
      list={list}
      key="list"
    />
  );
};

export default UIMessage;
