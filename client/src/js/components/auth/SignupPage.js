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
        onChange={e => onHandleChange(e, "email")}
      />
      <Form.Input
        fluid
        placeholder="Enter full name"
        id="fnameFormField"
        onChange={e => onHandleChange(e, "fname")}
      />

      <Form.Input
        fluid
        icon="eye"
        placeholder="Create password"
        type="password"
        id="passwordFormField"
        onChange={e => onHandleChange(e, "password")}
      />
    </AuthFormWrapper>
  );
};

export default SignupPage;
