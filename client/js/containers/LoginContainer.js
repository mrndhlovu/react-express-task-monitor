import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";

import { requestAuthLogin } from "../apis/apiRequests";
import { resetForm, emptyFunction } from "../utils/appUtils";
import { useAuth } from "../utils/hookUtils";
import LoginPage from "../components/auth/LoginPage";
import _debounce from "debounce";

const LoginContainer = ({ history, location }) => {
  const { from } = location.state || { from: { pathname: "/" } };

  const { auth } = useAuth();
  const [credentials, setCredentials] = useState({
    password: null,
    email: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onHandleChange = (e) => {
    const { value, name } = e.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const clearError = () => {
    setError(null);
    resetForm("authForm");
  };

  useEffect(() => {
    if (!loading) return emptyFunction();
    const redirect = () => {
      history.push(`${from.pathname}`);
      setLoading(false);
      window.location.reload();
    };
    const login = async () => {
      await requestAuthLogin(credentials)
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          _debounce(redirect(), 2000);
        })
        .catch((error) => {
          setLoading(false);
          setError(error.response.data);
        });
    };
    login();
  }, [loading, credentials, from, history]);

  if (auth.authenticated) return <Redirect to={`${from.pathname}`} />;

  return (
    <LoginPage
      clearError={clearError}
      error={error && { list: error }}
      handleLoginClick={(e) => {
        e.preventDefault();
        setLoading(true);
      }}
      history={history}
      loading={loading}
      onHandleChange={onHandleChange}
      disabled={!credentials.password || !credentials.email}
    />
  );
};

export default withRouter(LoginContainer);
