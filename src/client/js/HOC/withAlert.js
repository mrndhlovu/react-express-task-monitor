import React, { useState } from "react";

import UIMessage from "../components/sharedComponents/UIMessage";
import { emptyFunction } from "../utils/appUtils";
import { AlertContext } from "../utils/contextUtils";

import UIPortal from "../components/sharedComponents/UIPortal";

const INITIAL_STATE = {
  reason: null,
  message: null,
  success: false,
  cb: emptyFunction,
};

const withAlert = (WrappedComponent) => (props) => {
  const [alert, setAlert] = useState(INITIAL_STATE);

  const handleAlert = (newAlert) => setAlert({ ...INITIAL_STATE, ...newAlert });

  return (
    <UIPortal>
      <AlertContext.Provider value={{ notify: (data) => handleAlert(data) }}>
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
        <WrappedComponent {...props} />
      </AlertContext.Provider>
    </UIPortal>
  );
};

export default withAlert;
