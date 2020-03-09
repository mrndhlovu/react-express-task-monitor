import React from "react";

import { Form } from "semantic-ui-react";
import AuthFormWrapper from "../sharedComponents/AuthFormWrapper";

const LoginPage = ({ onHandleChange, handleLoginClick, ...otherProps }) => {
  return (
    <AuthFormWrapper
      buttonText="Log In"
      headText="Log in to continue to : Trello Clone"
      handleClick={handleLoginClick}
      {...otherProps}
    >
      <Form.Input
        fluid
        placeholder="Email"
        type="email"
        defaultValue="test@testing.com"
        onChange={e => onHandleChange(e, "email")}
      />

      <Form.Input
        fluid
        icon="eye"
        placeholder="Password"
        defaultValue="testing123"
        type="password"
        onChange={e => onHandleChange(e, "password")}
      />
    </AuthFormWrapper>
  );
};

export default LoginPage;
