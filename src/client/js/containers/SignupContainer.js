import React, { useState } from "react";
import { withRouter, Redirect } from "react-router-dom";

import { requestAuthSignup } from "../apis/apiRequests";
import { resetForm } from "../utils/appUtils";
import { useAuth, useAlert } from "../utils/hookUtils";
import SignupPage from "../components/auth/SignupPage";

const SignupContainer = ({ history }) => {
  const { authenticated, authListener } = useAuth().auth;
  const { notify } = useAlert();

  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    fname: null,
    password: null,
    email: null,
  });

  const onHandleChange = (e) => {
    const { value, name } = e.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    await requestAuthSignup(credentials)
      .then(() => {
        notify({ message: "Account created successfully!", success: true });
        authListener();
      })
      .catch((error) =>
        notify({
          message: error.response.data,
          cb: () => {
            resetForm("authForm");
            setLoading(false);
          },
        })
      );
  };

  if (authenticated) return <Redirect to="/" />;

  return (
    <SignupPage
      onHandleChange={onHandleChange}
      handleSignupClick={(e) => handleSignUp(e)}
      history={history}
      loading={loading}
    />
  );
};

export default withRouter(SignupContainer);
