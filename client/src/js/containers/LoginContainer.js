import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";

import { MainContext } from "../utils/contextUtils";
import { requestAuthLogin } from "../apis/apiRequests";
import { resetForm, emptyFunction } from "../utils/appUtils";
import LoginPage from "../components/auth/LoginPage";

const LoginContainer = ({ history, location }) => {
  const { from } = location.state || { from: { pathname: "/" } };

  const { authenticated } = useContext(MainContext).auth;
  const [credentials, setCredentials] = useState({
    password: null,
    email: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onHandleChange = (e) => {
    const value = e.target.value;
    const type = e.target.type;

    setCredentials({
      ...credentials,
      [type === "text" ? "password" : type]: value,
    });
  };

  const clearError = () => {
    setError(null);
    resetForm("authForm");
  };

  useEffect(() => {
    if (authenticated) return history.push(`${from.pathname}`);
  }, [history, authenticated, from]);

  useEffect(() => {
    if (!loading) return emptyFunction();
    setLoading(true);
    const login = async () => {
      await requestAuthLogin(credentials)
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));

          setLoading(false);
          if (res.status === 200) {
            history.push(`${from.pathname}`);
            window.location.reload();
          }
        })
        .catch((error) => setError(error.response.data));
    };
    login();
    setLoading(false);
  }, [loading, history, authenticated, from, credentials]);

  return (
    <LoginPage
      clearError={clearError}
      error={error}
      handleLoginClick={() => setLoading(true)}
      history={history}
      loading={loading}
      onHandleChange={onHandleChange}
      disabled={!credentials.password || !credentials.email}
    />
  );
};

export default withRouter(LoginContainer);
