import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";

import { AppContext } from "../utils/contextUtils";
import { requestAuthSignup } from "../apis/apiRequests";
import { resetForm } from "../utils/appUtils";
import SignupPage from "../components/auth/SignupPage";

const SignupContainer = ({ history }) => {
  const { authenticated } = useContext(AppContext).auth;
  const [error, setError] = useState(null);
  const [signup, setSignup] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    requestAuthSignup(credentials)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        setSignup(true);
        setLoading(false);
      })
      .catch(error => {
        setError(error.response.data.message);
      });
  };

  useEffect(() => {
    if (!authenticated && !signup) return;
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
      loading={loading}
    />
  );
};

export default withRouter(SignupContainer);
