import React from "react";

import { Form } from "semantic-ui-react";
import AuthFormWrapper from "../sharedComponents/AuthFormWrapper";

const SignupPage = ({ onHandleChange, handleSignupClick, ...otherProps }) => {
  return (
    <AuthFormWrapper
      buttonText="Sign Up"
      headText="Sign up for your account"
      handleClick={handleSignupClick}
      {...otherProps}
    >
      <Form.Input
        fluid
        placeholder="Email"
        type="email"
        id="emailFormField"
        onChange={(e) => onHandleChange(e)}
      />
      <Form.Input
        fluid
        placeholder="Enter full name"
        id="fnameFormField"
        type="text"
        onChange={(e) => onHandleChange(e)}
      />

      <Form.Input
        fluid
        icon="eye"
        placeholder="Create password"
        type="password"
        id="passwordFormField"
        onChange={(e) => onHandleChange(e)}
      />
    </AuthFormWrapper>
  );
};

export default SignupPage;
