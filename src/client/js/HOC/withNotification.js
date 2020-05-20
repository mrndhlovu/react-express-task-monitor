import React, { useState } from "react";

import UIMessage from "../components/sharedComponents/UIMessage";

const INITIAL_STATE = { reason: null, message: null, status: false, cb: null };

const withNotification = (WrappedComponent) => (props) => {
  const [alert, setAlert] = useState(INITIAL_STATE);

  const handleAlert = ({ message, success, reason, cb }) => {
    setAlert({ ...INITIAL_STATE, message, reason, success, cb });
  };
  return (
    <>
      {alert.message && (
        <UIMessage
          message={alert.reason}
          handleDismiss={() => {
            setAlert(INITIAL_STATE);
            alert.cb && alert.cb();
          }}
          list={[alert.message]}
          error={!alert.success}
          success={alert.success}
        />
      )}
      <WrappedComponent
        notify={(data) => handleAlert({ ...data })}
        {...props}
      />
    </>
  );
};

export default withNotification;
