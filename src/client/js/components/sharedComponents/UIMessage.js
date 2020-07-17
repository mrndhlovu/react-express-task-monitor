import React from "react";
import PropTypes from "prop-types";

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
  }, 2000);

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

UIMessage.propTypes = {
  dataTestId: PropTypes.string,
  error: PropTypes.bool,
  handleDismiss: PropTypes.func,
  list: PropTypes.string.isRequired,
  message: PropTypes.string,
  success: PropTypes.bool,
};

export default UIMessage;
