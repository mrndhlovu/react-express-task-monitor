import React from "react";

import { Message } from "semantic-ui-react";

const UIMessage = ({
  message,
  success = false,
  error = false,
  handleDismiss,
}) => {
  return (
    <Message
      content={message}
      positive={success}
      negative={error}
      onDismiss={handleDismiss}
      size="tiny"
    />
  );
};

export default UIMessage;
