import React from "react";
import styled from "styled-components";

import { Form, Grid, Icon, Button, Divider } from "semantic-ui-react";
import OtherSignupOptionButton from "./OtherSignupOptionButton";
import MessageAlert from "./MessageAlert";

const FormContainer = styled.div`
  align-items: center;
  background-color: #fafbfc;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  margin-top: -5%;
  position: relative;
`;

const StyledHeader = styled.div`
  font-size: 25px;
  color: #0079bf;
  width: max-content;
  transition-duration: 500ms;
  &::after {
    content: "Task Monitor";
    font-family: "Shadows Into Light Two", cursive;
  }
`;

const HeaderContainer = styled.div``;

const StyledFormColumn = styled(Grid.Column)`
  min-width: 350px;
`;

const Subheader = styled.div`
  color: ${(props) => (props.footer ? "#1154cd" : "#5e6c83")};
  cursor: ${(props) => props.footer && "pointer"};
  font-family: "Poppins";
  font-size: 14px;
  font-weight: ${(props) => !props.footer && 700};
  padding: 10px;
  text-align: center;
  transition-duration: 250ms;
  transition-timing-function: ease-in-out;

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

const StyledSegment = styled.div`
  background: #fff;
  border-radius: 0.28571429rem;
  border: 1px solid #22242626;
  box-shadow: 0 1px 2px 0 #22242626;
  margin: 3rem 0;
  padding: 1em 1em;
  position: relative;
`;

const AuthFormWrapper = ({
  children,
  buttonText,
  headText,
  history,
  handleClick,
  error,
  clearError,
  loading,
  disabled,
}) => {
  const signup = history.location.pathname === "/signup";
  const suggestion = signup
    ? "Already have an account? Log in"
    : "Can't log in? Sign up for an account";

  return (
    <FormContainer>
      <MessageAlert
        open={error}
        close={clearError}
        error={true}
        message={error}
      />

      <HeaderContainer>
        <StyledHeader>
          <Icon name="bullseye" size="large" />
        </StyledHeader>
      </HeaderContainer>

      <StyledFormColumn>
        <Form size="large" id="authForm">
          <StyledSegment>
            <Subheader>{headText} </Subheader>
            {children}
            <StyledButton
              fluid
              loading={loading}
              disabled={disabled}
              size="large"
              content={buttonText}
              onClick={() => handleClick()}
            />
            <Divider content="OR" horizontal />
            <OtherSignupOptionButton
              buttonText="Continue with Google"
              icon="google"
            />

            <OtherSignupOptionButton
              buttonText="Continue with Microsoft"
              icon="microsoft"
            />
            <Divider />
            <Subheader
              footer={true}
              onClick={() => history.push(signup ? "/login" : "/signup")}
            >
              {suggestion}
            </Subheader>
          </StyledSegment>
        </Form>
      </StyledFormColumn>
    </FormContainer>
  );
};

export default AuthFormWrapper;
