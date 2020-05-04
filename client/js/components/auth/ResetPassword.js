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
      buttonText={passwordChanged ? "Continue" : "Save"}
      headText={passwordChanged ? "Password changed" : "New Password"}
      handleClick={passwordChanged ? () => history.push("/") : handleSaveClick}
      socialButtons={false}
      authCta="Log in"
      redirect="/login"
      passwordChanged={passwordChanged}
      history={history}
      {...rest}
    >
      {!passwordChanged && (
        <>
          <UIFormInput
            autoFocus={true}
            placeholder="Password"
            type="password"
            name="password"
            onChange={(e) => onHandleChange(e)}
          />
          <UIFormInput
            autoFocus={true}
            placeholder="Confirm password"
            type="password"
            name="password"
            onChange={(e) => onHandleChange(e)}
          />
        </>
      )}
    </AuthFormWrapper>
  );
};

export default ResetPassword;
