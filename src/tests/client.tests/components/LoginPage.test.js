import React from "react";
import { mount } from "enzyme";

import { findByDataTestId, mockCallBack } from "../../utils";
import LoginPage from "../../../client/js/components/auth/LoginPage";

const DEFAULT_PROPS = {
  history: { push: () => "/", location: { pathname: "/" } },
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
    const loginButton = findByDataTestId(loginForm, "login-button").first();

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
    forgotPasswordLink = findByDataTestId(loginForm, "forgot-password-link");
    const signUpOption = findByDataTestId(loginForm, "signup-link").first();

    signUpOption.simulate("click");

    expect(forgotPasswordLink).toBeDefined();
    expect(signUpOption).toBeDefined();
    expect(mockCallBack).toHaveBeenCalled();
  });
});
