import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";

import { AppContext } from "../utils/contextUtils";
import { requestAuthLogin } from "../apis/apiRequests";
import { resetForm } from "../utils/appUtils";
import LoginPage from "../components/auth/LoginPage";

const LoginContainer = ({ history, location }) => {
  const { from } = location.state || { from: { pathname: "/" } };

  const { authenticated } = useContext(AppContext);
  const [credentials, setCredentials] = useState({
    password: null,
    email: null
  });
  const [error, setError] = useState(null);
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

  useEffect(() => {
    if (!loading) return;

    const login = async () => {
      setLoading(true);
      await requestAuthLogin(credentials)
        .then(res => {
          localStorage.setItem("token", res.data.token);
          setLoading(false);
          if (res.status === 200) return history.push(`${from.pathname}`);

          history.push({ pathname: "/empty" });
          history.replace({ pathname: from.pathname });
        })
        .catch(error => {
          setError(error.response.data.message);
          setLoading(false);
        });
    };
    login();
  }, [loading, history, authenticated, from, credentials]);

  return (
    <LoginPage
      clearError={clearError}
      error={error}
      handleLoginClick={() => setLoading(true)}
      history={history}
      loading={loading}
      onHandleChange={onHandleChange}
    />
  );
};

export default withRouter(LoginContainer);
