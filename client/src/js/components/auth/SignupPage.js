import React, { useState } from "react";
import PropTypes from "prop-types";

import AuthFormWrapper from "../sharedComponents/AuthFormWrapper";
import UIFormInput from "../sharedComponents/UIFormInput";

const SignupPage = ({ onHandleChange, handleSignupClick, ...otherProps }) => {
  const [type, setType] = useState("password");

  return (
    <AuthFormWrapper
      dataTestId="signup-form"
      buttonText="Sign Up"
      headText="Sign up for your account"
      handleClick={handleSignupClick}
      authCta="Already have an account? Log in"
      redirect="/login"
      {...otherProps}
    >
      <UIFormInput
        id="emailFormField"
        name="email"
        onChange={(e) => onHandleChange(e)}
        placeholder="Email"
        type="email"
      />
      <UIFormInput
        id="fnameFormField"
        name="fname"
        onChange={(e) => onHandleChange(e)}
        placeholder="Enter full name"
        type="text"
      />

      <UIFormInput
        iconProps={{
          name: type === "password" ? "eye" : "hide",
          link: true,
          onClick: () => setType(type === "password" ? "text" : "password"),
        }}
        id="passwordFormField"
        name="password"
        onChange={(e) => onHandleChange(e)}
        placeholder="Create password"
        type={type}
        dataTestId="password-form-input"
      />
    </AuthFormWrapper>
  );
};

SignupPage.propTypes = {
  onHandleChange: PropTypes.func.isRequired,
  handleSignupClick: PropTypes.func.isRequired,
};

export default SignupPage;
