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
      {...otherProps}
    >
      <UIFormInput
        fluid
        placeholder="Email"
        type="email"
        id="emailFormField"
        onChange={(e) => onHandleChange(e)}
      />
      <UIFormInput
        fluid
        placeholder="Enter full name"
        id="fnameFormField"
        type="text"
        onChange={(e) => onHandleChange(e)}
      />

      <UIFormInput
        fluid
        iconProps={{
          name: type === "password" ? "eye" : "hide",
          link: true,
          onClick: () => setType(type === "password" ? "text" : "password"),
        }}
        placeholder="Create password"
        type={type}
        id="passwordFormField"
        onChange={(e) => onHandleChange(e)}
      />
    </AuthFormWrapper>
  );
};

export default SignupPage;
