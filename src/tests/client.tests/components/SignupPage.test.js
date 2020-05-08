import React from "react";
import { mount } from "enzyme";

import { findByDataTestId, mockCallBack } from "../../utils";
import SignupPage from "../../../client/js/components/auth/SignupPage";

const DEFAULT_PROPS = {
  history: { push: () => "/", location: { pathname: "/signup" } },
};

describe("SignupPage", () => {
  let wrapper;
  let loginForm;
  let forgotPasswordLink;

  function init(...props) {
    wrapper = mount(<SignupPage {...DEFAULT_PROPS} {...props} />);
  }

  beforeEach(() => {
    init();
  });

  it("Mounts correctly", () => {
    expect(wrapper).toBeDefined();
  });

  it("it should load signup form", async () => {
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
    expect(loginButton.text()).toBe("Sign Up");
    expect(mockCallBack).toHaveBeenCalled();
  });

  it("should click render correct text on button, not show 'Forgot Password' link and show login option ", () => {
    forgotPasswordLink = findByDataTestId(loginForm, "forgot-password-link");
    const loginOption = findByDataTestId(loginForm, "form-subheader").first();

    loginOption.simulate("click");

    expect(forgotPasswordLink.length).toBe(0);
    expect(loginOption.length).toBe(1);
    expect(mockCallBack).toHaveBeenCalled();
  });
});
