import React, { useEffect } from "react";
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
  useEffect(() => {
    setTimeout(() => {
      handleDismiss();
    }, 2000);
  }, [handleDismiss]);

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
  list: PropTypes.arrayOf(PropTypes.string),
  message: PropTypes.string,
  success: PropTypes.bool,
};

export default UIMessage;
