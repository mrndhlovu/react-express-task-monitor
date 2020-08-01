import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Button } from "semantic-ui-react";

import { stringsEqual } from "../../utils/appUtils";
import SocialAuthButton from "./SocialAuthButton";
import UIContainer from "./UIContainer";
import UIDivider from "./UIDivider";
import UISmall from "./UISmall";

import { SOCIAL_AUTH_OPTIONS } from "../../constants/constants";
import { Target } from "react-feather";
import { AUTH_EP } from "../../utils/urls";
import { requestSocialAuth } from "../../apis/apiRequests";

const StyledHeader = styled.div``;

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
  margin-bottom: 0;

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
  disabled,
  handleClick,
  headText = "Log in to continue",
  history,
  loading,
  socialButtons = true,
  authCta,
  redirect,
  passwordChanged,
  dataTestId,
}) => {
  const isLoginPage = stringsEqual(history.location.pathname, "/login");
  const resetPasswordPage = stringsEqual(
    history.location.pathname,
    "/reset-password"
  );

  const onButtonClick = (e, provider) => {
    e.preventDefault();
    const url = `${AUTH_EP}/${provider}`;
    window.location = url;
    console.log("onButtonClick -> url", url);
  };

  return (
    <UIContainer dataTestId={dataTestId} className="auth-page">
      <FormWrapper data-test-id="login-form" id="authForm" target="#">
        <StyledHeader className="logo-container">
          <Target className="logoIcon" />
          <span>Trello Clone</span>
        </StyledHeader>
        <Subheader>{headText} </Subheader>
        {children}
        <StyledButton
          fluid
          loading={loading}
          disabled={disabled}
          size="large"
          content={buttonText}
          data-test-id="primary-auth-button"
          onClick={(e) => handleClick(e)}
        />

        {!resetPasswordPage && <UIDivider content="OR" horizontal={true} />}
        {socialButtons && (
          <>
            {SOCIAL_AUTH_OPTIONS.map((option) => (
              <SocialAuthButton
                key={option.key}
                buttonText={`Continue with ${option.name}`}
                icon={option.key}
                handleButtonClick={(e) => onButtonClick(e, option.key)}
              />
            ))}

            <UIDivider />
          </>
        )}

        {!resetPasswordPage && !passwordChanged && (
          <Subheader
            data-test-id="form-subheader"
            footer={true}
            onClick={() => history.push(redirect)}
          >
            {authCta}
          </Subheader>
        )}
        {isLoginPage && (
          <UISmall
            dataTestId="forgot-password-link"
            margin="10%"
            handleClick={() => history.push("/recovery")}
            content="Forgot password."
          />
        )}
      </FormWrapper>
    </UIContainer>
  );
};

AuthFormWrapper.defaultProps = {};

AuthFormWrapper.propTypes = {
  buttonText: PropTypes.string,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func,
  headText: PropTypes.string,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  loading: PropTypes.bool,
  socialButtons: PropTypes.string,
  authCta: PropTypes.string,
  redirect: PropTypes.string,
  passwordChanged: PropTypes.bool,
  dataTestId: PropTypes.string,
};

export default AuthFormWrapper;
