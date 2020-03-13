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
  const [loading, setLoading] = useState(null);

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
    setLoading(true);
    const login = async () => {
      await requestAuthLogin(credentials)
        .then(res => {
          const user = { ...res.data };
          localStorage.setItem("user", JSON.stringify(user));
          setLoading(false);
          if (res.status === 200) return history.push(`${from.pathname}`);
        })
        .catch(error => setError(error.response.data));
    };
    login();
    setLoading(null);
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
