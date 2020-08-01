import React from "react";
import PropTypes from "prop-types";

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
            input
          />
          <UIFormInput
            id="password-confirm-input"
            placeholder="Confirm password"
            type="password"
            name="confirmPassword"
            onChange={(e) => onHandleChange(e)}
            input
          />
        </>
      )}
    </AuthFormWrapper>
  );
};

ResetPassword.propTypes = {
  onHandleChange: PropTypes.func.isRequired,
  handleSaveClick: PropTypes.func.isRequired,
  passwordChanged: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default ResetPassword;
