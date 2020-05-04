import React from "react";
import styled from "styled-components";

import { Icon, Button } from "semantic-ui-react";

import { stringsEqual } from "../../utils/appUtils";
import SocialAuthButton from "./SocialAuthButton";
import UIContainer from "./UIContainer";
import UIDivider from "./UIDivider";
import UIMessage from "./UIMessage";

const StyledHeader = styled.div`
  color: #0079bf;
  font-family: Poppins, sans-serif;
  font-size: 25px;
  transition-duration: 500ms;
  width: max-content;
  position: absolute;
  top: 16%
}
`;

const FormWrapper = styled.form`
  background: #fff;
  border-radius: 2px;
  border: 1px solid #22242626;
  box-shadow: 0 1px 2px 0 #22242626;
  padding: 1em 1em;
  width: 340px;
  top: 25%;
  position: fixed;
`;

const StyledSmall = styled.small`
  position: absolute;
  cursor: pointer;
  bottom: 10px;
  left: 13%;

  &:hover {
    text-decoration: underline;
  }
`;

const Subheader = styled.h4`
  color: ${(props) => (props.footer ? "#1154cd" : "#5e6c83")};
  cursor: ${(props) => props.footer && "pointer"};
  font-family: "Poppins";
  font-size: 14px;
  font-weight: ${(props) => !props.footer && 700};
  padding: 10px;
  text-align: center;
  transition-duration: 250ms;
  transition-timing-function: ease-in-out;
  margin-top: 0;

  &:hover {
    text-decoration: ${(props) => props.signup && "underline"};
  }
`;

const StyledButton = styled(Button)`
  background-color: #0079bf !important;
  border-radius: 0px !important;
  color: white !important;
  font-size: 15px !important;
  font-weight: 100 !important;
`;

const AuthFormWrapper = ({
  buttonText,
  children,
  clearError,
  disabled,
  error,
  handleClick,
  headText,
  history,
  loading,
  socialButtons = true,
  authCta,
  redirect,
}) => {
  const isLoginPage = stringsEqual(history.location.pathname, "/login");
  const resetPasswordPage = stringsEqual(
    history.location.pathname,
    "/reset-password"
  );

  return (
    <UIContainer className="auth-page">
      <StyledHeader>
        <Icon name="bullseye" size="large" />
        Task Monitor
      </StyledHeader>

      <FormWrapper id="authForm" onSubmit={(e) => handleClick(e)}>
        {error && (
          <UIMessage
            error={true}
            handleDismiss={() => clearError()}
            list={[error.list]}
          />
        )}

        <Subheader>{headText} </Subheader>
        {children}

        <StyledButton
          fluid
          loading={loading}
          disabled={disabled}
          size="large"
          content={buttonText}
        />

        {!resetPasswordPage && <UIDivider content="OR" horizontal={true} />}
        {socialButtons && (
          <>
            <SocialAuthButton buttonText="Continue with Google" icon="google" />

            <SocialAuthButton
              buttonText="Continue with Microsoft"
              icon="microsoft"
            />

            <UIDivider />
          </>
        )}

        {!resetPasswordPage && (
          <Subheader footer={true} onClick={() => history.push(redirect)}>
            {authCta}
          </Subheader>
        )}
        {isLoginPage && (
          <StyledSmall onClick={() => history.push("/recovery")}>
            Forgot password!
          </StyledSmall>
        )}
      </FormWrapper>
    </UIContainer>
  );
};

export default AuthFormWrapper;
