import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";

import { AppContext } from "../utils/contextUtils";
import { requestAuthLogin } from "../apis/apiRequests";
import { resetForm } from "../utils/appUtils";
import LoginPage from "../components/auth/LoginPage";

const LoginContainer = ({ history, location }) => {
  const { from } = location.state || { from: { pathname: "/" } };

  const { authenticated } = useContext(AppContext).auth;
  const [credentials, setCredentials] = useState({
    password: null,
    email: null
  });
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const onHandleChange = (e, field) => {
    const value = e.target.value;
    credentials[field] = value;
    setCredentials(credentials);
  };

  const clearError = () => {
    setError(null);
    resetForm("authForm");
  };

  const handleLoginClick = () => {
    setLoading(true);
    requestAuthLogin(credentials)
      .then(res => {
        if (res.status === 200) history.push(`${from.pathname}`);
        setCredentials(res.data);
        localStorage.setItem("token", res.data.token);

        setLoggedIn(true);
      })
      .catch(error => {
        setError(error.response.data.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!authenticated && !loggedIn) return;

    const handleRedirect = () => {
      // history.push({ pathname: "/empty" });
      history.replace({ pathname: from.pathname });
    };

    handleRedirect();
    setLoading(false);
  }, [loggedIn, history, authenticated, from]);

  return (
    <LoginPage
      clearError={clearError}
      error={error}
      handleLoginClick={handleLoginClick}
      history={history}
      loading={loading}
      onHandleChange={onHandleChange}
    />
  );
};

export default withRouter(LoginContainer);
