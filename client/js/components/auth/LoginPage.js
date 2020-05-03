import React, { useState } from "react";

import AuthFormWrapper from "../sharedComponents/AuthFormWrapper";
import UIFormInput from "../sharedComponents/UIFormInput";

const LoginPage = ({ onHandleChange, handleLoginClick, ...rest }) => {
  const [type, setType] = useState("password");
  const env = process.env.NODE_ENV;

  return (
    <AuthFormWrapper
      buttonText="Log In"
      headText="Log in to continue to : Task Monitor"
      handleClick={handleLoginClick}
      {...rest}
    >
      <UIFormInput
        fluid
        placeholder="Email"
        type="email"
        onChange={(e) => onHandleChange(e)}
        autoFocus
        defaultValue={env === "development" ? "test@testing.com" : ""}
      />

      <UIFormInput
        fluid
        iconProps={{
          name: type === "password" ? "eye" : "hide",
          link: true,
          onClick: () => setType(type === "password" ? "text" : "password"),
        }}
        defaultValue={env === "development" ? "testing123" : ""}
        placeholder="Password"
        type={type}
        onChange={(e) => onHandleChange(e)}
      />
    </AuthFormWrapper>
  );
};

export default LoginPage;
