import React from "react";
import PropTypes from "prop-types";

import AuthFormWrapper from "../shared/AuthFormWrapper";
import UIFormInput from "../shared/UIFormInput";

const EmailRecovery = ({ handleEmailPassword, onHandleChange, ...rest }) => {
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

EmailRecovery.propTypes = {
  handleEmailPassword: PropTypes.func.isRequired,
  onHandleChange: PropTypes.func.isRequired,
};

export default EmailRecovery;
