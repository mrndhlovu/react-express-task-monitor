import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import { Form, Grid, Icon, Button, Divider, Message } from "semantic-ui-react";
import OtherSignupOptionButton from "./OtherSignupOptionButton";

const FormContainer = styled.div`
  align-items: center;
  background-color: #fafbfc;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  margin-top: -5%;
`;

const StyledHeader = styled.div`
  font-size: 25px;
  color: #0079bf;
  width: max-content;
  transition-duration: 500ms;
  &::after {
    content: "Trello Clone";
    font-family: "Dancing Script", cursive;
  }
`;

const HeaderContainer = styled.div``;

const StyledFormColumn = styled(Grid.Column)`
  min-width: 350px;
`;

const Subheader = styled.div`
  padding: 10px;
  text-align: center;
  cursor: ${props => props.footer && "pointer"};
  color: ${props => (props.footer ? "#1154cd" : "#5e6c83")};
  font-weight: ${props => !props.footer && 700};
  font-family: "Poppins";
  font-size: 14px;

  transition-duration: 250ms;
  transition-timing-function: ease-in-out;

  &:hover {
    text-decoration: ${props => props.signup && "underline"};
  }
`;

const StyledButton = styled(Button)`
  border-radius: 0px !important;
  background-color: #0079bf !important;
  color: white !important;
  font-weight: 100 !important;
  font-size: 15px !important;
`;

const StyledSegment = styled.div`
  position: relative;
  background: #fff;
  box-shadow: 0 1px 2px 0 #22242626;
  margin: 3rem 0;
  padding: 1em 1em;
  border-radius: 0.28571429rem;
  border: 1px solid #22242626;
`;

const AuthFormWrapper = ({
  children,
  buttonText,
  headText,
  history,
  handleClick,
  error,
  clearError,
  loading
}) => {
  const signup = history.location.pathname === "/signup";
  const suggestion = signup
    ? "Already have an account? Log in"
    : "Can't log in? Sign up for an account";
  return (
    <FormContainer>
      <HeaderContainer>
        <StyledHeader>
          <Icon name="trello" size="large" />
        </StyledHeader>

        {error && (
          <Message
            size="tiny"
            error
            textAlign="left"
            content={error}
            onDismiss={() => clearError()}
          />
        )}
      </HeaderContainer>

      <StyledFormColumn>
        <Form size="large" id="authForm">
          <StyledSegment>
            <Subheader>{headText} </Subheader>

            {children}

            <StyledButton
              fluid
              loading={loading}
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

export default withRouter(AuthFormWrapper);
