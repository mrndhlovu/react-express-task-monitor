import React, { useState } from "react";

import AuthFormWrapper from "../sharedComponents/AuthFormWrapper";
import UIFormInput from "../sharedComponents/UIFormInput";

const SignupPage = ({ onHandleChange, handleSignupClick, ...otherProps }) => {
  const [type, setType] = useState("password");

  return (
    <AuthFormWrapper
      buttonText="Sign Up"
      headText="Sign up for your account"
      handleClick={handleSignupClick}
      authCta="Already have an account? Log in"
      redirect="/login"
      {...otherProps}
    >
      <UIFormInput
        fluid
        id="emailFormField"
        name="email"
        onChange={(e) => onHandleChange(e)}
        placeholder="Email"
        type="email"
      />
      <UIFormInput
        fluid
        id="fnameFormField"
        name="fname"
        onChange={(e) => onHandleChange(e)}
        placeholder="Enter full name"
        type="text"
      />

      <UIFormInput
        fluid
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
      />
    </AuthFormWrapper>
  );
};

export default SignupPage;
