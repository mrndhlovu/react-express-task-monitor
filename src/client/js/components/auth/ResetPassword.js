import React from "react";

import AuthFormWrapper from "../sharedComponents/AuthFormWrapper";
import UIFormInput from "../sharedComponents/UIFormInput";

const ResetPassword = ({
  onHandleChange,
  handleSaveClick,
  passwordChanged,
  history,
  message,
  ...rest
}) => {
  return (
    <AuthFormWrapper
      authCta="Log in"
      buttonText={passwordChanged ? "Continue" : "Save"}
      error={!message.success}
      handleClick={passwordChanged ? () => history.push("/") : handleSaveClick}
      headText={passwordChanged ? "Password updated" : "Update password"}
      history={history}
      message={message.text}
      passwordChanged={passwordChanged}
      positive={message.success}
      redirect="/login"
      socialButtons={false}
      {...rest}
    >
      {!passwordChanged && (
        <>
          <UIFormInput
            id="password-input"
            autoFocus={true}
            placeholder="Password"
            type="password"
            name="password"
            onChange={(e) => onHandleChange(e)}
          />
          <UIFormInput
            id="password-confirm-input"
            placeholder="Confirm password"
            type="password"
            name="confirmPassword"
            onChange={(e) => onHandleChange(e)}
          />
        </>
      )}
    </AuthFormWrapper>
  );
};

export default ResetPassword;
