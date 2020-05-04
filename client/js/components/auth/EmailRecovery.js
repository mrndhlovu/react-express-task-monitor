import React from "react";

import AuthFormWrapper from "../sharedComponents/AuthFormWrapper";
import UIFormInput from "../sharedComponents/UIFormInput";

const EmailRecovery = ({ onHandleChange, handleEmailPassword, ...rest }) => {
  return (
    <AuthFormWrapper
      buttonText="Email Password"
      headText="Recover Password"
      handleClick={handleEmailPassword}
      socialButtons={false}
      authCta="Log in"
      redirect="/login"
      {...rest}
    >
      <UIFormInput
        autoFocus={true}
        placeholder="Email"
        type="email"
        name="email"
        onChange={(e) => onHandleChange(e)}
      />
    </AuthFormWrapper>
  );
};

export default EmailRecovery;
