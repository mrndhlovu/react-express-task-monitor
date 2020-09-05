import React from "react";
import PropTypes from "prop-types";

import { AlertContext } from "../../utils/contextUtils";
import UIMessage from "./UIMessage";
import UIPortal from "./UIPortal";

const UIAlert = ({ message, alertUser }) => {
  return message.message ? (
    <UIPortal>
      <AlertContext.Provider>
        <UIMessage
          message={message.reason}
          handleDismiss={() => alertUser()}
          list={[message.message]}
          error={!message.success}
          success={message.success}
        />
      </AlertContext.Provider>
    </UIPortal>
  ) : null;
};

UIAlert.defaultProps = {
  message: {},
};

UIAlert.propTypes = {
  message: PropTypes.shape({}),
  alertUser: PropTypes.func.isRequired,
};

export default UIAlert;
