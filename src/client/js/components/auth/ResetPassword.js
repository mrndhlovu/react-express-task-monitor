import React from "react";

import AuthFormWrapper from "../sharedComponents/AuthFormWrapper";
import UIFormInput from "../sharedComponents/UIFormInput";

const ResetPassword = ({
  onHandleChange,
  handleSaveClick,
  passwordChanged,
  history,
  ...rest
}) => {
  return (
    <AuthFormWrapper
      authCta="Log in"
      buttonText={passwordChanged ? "Continue" : "Save"}
      handleClick={passwordChanged ? () => history.push("/") : handleSaveClick}
      headText={passwordChanged ? "Password updated" : "Update password"}
      history={history}
      passwordChanged={passwordChanged}
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
