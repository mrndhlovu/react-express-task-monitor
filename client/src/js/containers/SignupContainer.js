import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";

import { requestAuthSignup } from "../apis/apiRequests";
import { resetForm } from "../utils/appUtils";
import SignupPage from "../components/auth/SignupPage";
import { AppContext } from "../utils/contextUtils";

const SignupContainer = ({ history }) => {
  const { authenticated } = useContext(AppContext).auth;
  const [error, setError] = useState(null);
  const [signup, setSignup] = useState(null);
  const [credentials, setCredentials] = useState({
    fname: null,
    password: null,
    email: null
  });

  const onHandleChange = (e, field) => {
    const value = e.target.value;
    credentials[field] = value;
    setCredentials(credentials);
  };

  const clearError = () => {
    setError(null);
    resetForm("authForm");
  };

  const handleSignupClick = () => {
    requestAuthSignup(credentials)
      .then(res => {
        setCredentials(res.data);
        localStorage.setItem("token", res.data.token);
        setSignup(true);
      })
      .catch(error => setError("Failed to signup!"));
  };

  useEffect(() => {
    if (!authenticated) return;
    const handleRedirect = () => {
      return history.push("/");
    };
    handleRedirect();
  }, [signup, history, authenticated]);

  return (
    <SignupPage
      onHandleChange={onHandleChange}
      handleSignupClick={handleSignupClick}
      history={history}
      error={error}
      clearError={clearError}
    />
  );
};

export default withRouter(SignupContainer);
