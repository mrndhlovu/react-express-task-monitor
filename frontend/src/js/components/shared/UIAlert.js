import React from "react";
import PropTypes from "prop-types";

import UIMessage from "./UIMessage";
import UIPortal from "./UIPortal";

const UIAlert = ({ alert, alertUser }) => {
  return alert.message ? (
    <UIPortal>
      <UIMessage
        alert={alert.reason}
        handleDismiss={() => alertUser()}
        list={[alert.message]}
        error={!alert.success}
        success={alert.success}
      />
    </UIPortal>
  ) : null;
};

UIAlert.defaultProps = {
  alert: {},
};

UIAlert.propTypes = {
  alert: PropTypes.shape({}),
  alertUser: PropTypes.func.isRequired,
};

export default UIAlert;
