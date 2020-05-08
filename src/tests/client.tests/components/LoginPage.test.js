import React from "react";
import { mount } from "enzyme";

import { findByDataTestId, mockCallBack } from "../../utils";
import LoginPage from "../../../client/js/components/auth/LoginPage";

const DEFAULT_PROPS = {
  history: { push: () => "/", location: { pathname: "/login" } },
};

describe("LoginPage", () => {
  let wrapper;
  let loginForm;
  let forgotPasswordLink;

  function init(...props) {
    wrapper = mount(<LoginPage {...DEFAULT_PROPS} {...props} />);
  }

  beforeEach(() => {
    init();
  });

  it("Mounts correctly", () => {
    expect(wrapper).toBeDefined();
  });

  it("it should load login form", async () => {
    loginForm = findByDataTestId(wrapper, "login-form").first();
    const loginButton = findByDataTestId(
      loginForm,
      "primary-auth-button"
    ).first();

    wrapper.setProps({
      handleClick: mockCallBack,
      onClick: mockCallBack,
      ...DEFAULT_PROPS,
    });

    loginButton.simulate("click");

    expect(loginForm).toBeDefined();
    expect(loginButton).toBeDefined();
    expect(loginButton.text()).toBe("Log In");
    expect(mockCallBack).toHaveBeenCalled();
  });

  it("should click render correct text on button, show 'Forgot Password' link and signup option ", () => {
    forgotPasswordLink = findByDataTestId(
      loginForm,
      "forgot-password-link"
    ).first();

    const signUpOption = findByDataTestId(loginForm, "form-subheader").first();

    signUpOption.simulate("click");

    expect(forgotPasswordLink.length).toBe(1);
    expect(forgotPasswordLink.text()).toBe("Forgot password.");
    expect(signUpOption).toBeDefined();
    expect(mockCallBack).toHaveBeenCalled();
  });

  it("should click on eye icon and  from", () => {
    const passwordFormField = findByDataTestId(
      loginForm,
      "password-input-field"
    ).first();

    const passwordFormFieldIcon = findByDataTestId(
      loginForm,
      "password-input-field-eye-icon"
    ).first();

    passwordFormFieldIcon.simulate("click");

    expect(mockCallBack).toHaveBeenCalled();
    expect(passwordFormField.prop("type")).toBe("password");
  });
});
