import React from "react";

import AuthFormWrapper from "../sharedComponents/AuthFormWrapper";
import UIFormInput from "../sharedComponents/UIFormInput";

const EmailRecovery = ({
  handleEmailPassword,
  message,
  onHandleChange,
  ...rest
}) => {
  return (
    <AuthFormWrapper
      authCta="Log in"
      buttonText="Email Password"
      handleClick={handleEmailPassword}
      headText="Reset Password"
      redirect="/login"
      socialButtons={false}
      {...rest}
    >
      <UIFormInput
        id="reset-email-input"
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
