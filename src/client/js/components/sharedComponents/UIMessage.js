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
  setTimeout(() => {
    handleDismiss && handleDismiss();
  }, 3000);

  return (
    <Message
      className="message-box"
      floating
      header={message}
      info={success}
      negative={error}
      data-test-id={dataTestId || "notification"}
      size="tiny"
      list={list}
      key="list"
    />
  );
};

export default UIMessage;
