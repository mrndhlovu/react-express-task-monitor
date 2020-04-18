import React, { useState } from "react";

import { Form, Icon } from "semantic-ui-react";
import AuthFormWrapper from "../sharedComponents/AuthFormWrapper";

const LoginPage = ({ onHandleChange, handleLoginClick, ...rest }) => {
  const [type, setType] = useState("password");
  const env = process.env.NODE_ENV;

  return (
    <AuthFormWrapper
      buttonText="Log In"
      headText="Log in to continue to : Trello Clone"
      handleClick={handleLoginClick}
      {...rest}
    >
      <Form.Input
        fluid
        placeholder="Email"
        type="email"
        onChange={(e) => onHandleChange(e)}
        autoFocus
        defaultValue={env === "development" ? "test@testing.com" : ""}
      />

      <Form.Input
        fluid
        icon={
          <Icon
            name={type === "password" ? "eye" : "hide"}
            link
            onClick={() => setType(type === "password" ? "text" : "password")}
          />
        }
        defaultValue={env === "development" ? "testing123" : ""}
        placeholder="Password"
        type={type}
        onChange={(e) => onHandleChange(e)}
      />
    </AuthFormWrapper>
  );
};

export default LoginPage;
