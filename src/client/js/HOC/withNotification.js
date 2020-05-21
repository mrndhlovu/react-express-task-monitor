import React, { useState } from "react";

import UIMessage from "../components/sharedComponents/UIMessage";
import { emptyFunction } from "../utils/appUtils";

const INITIAL_STATE = {
  reason: null,
  message: null,
  status: false,
  cb: emptyFunction,
};

const withNotification = (WrappedComponent) => (props) => {
  const [alert, setAlert] = useState(INITIAL_STATE);

  const handleAlert = (newState) => setAlert({ ...INITIAL_STATE, ...newState });

  return (
    <>
      {alert.message && (
        <UIMessage
          message={alert.reason}
          handleDismiss={() => {
            setAlert(INITIAL_STATE);
            return alert.cb();
          }}
          list={[alert.message]}
          error={!alert.success}
          success={alert.success}
        />
      )}
      <WrappedComponent notify={(data) => handleAlert(data)} {...props} />
    </>
  );
};

export default withNotification;
