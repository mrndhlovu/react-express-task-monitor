import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";
import _debounce from "debounce";

import { requestAuthLogin } from "../apis/apiRequests";
import { resetForm, emptyFunction } from "../utils/appUtils";
import { useAuth } from "../utils/hookUtils";
import LoginPage from "../components/auth/LoginPage";

const LoginContainer = ({ history, location }) => {
  const { from } = location.state || { from: { pathname: "/" } };

  const { auth } = useAuth();
  const [credentials, setCredentials] = useState({
    password: null,
    email: null,
  });
  const [message, setMessage] = useState({ text: null, success: null });
  const [loading, setLoading] = useState(false);

  const onHandleChange = (e) => {
    const { value, name } = e.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const clearError = () => {
    setMessage({ text: null, success: null });
    resetForm("authForm");
  };

  useEffect(() => {
    if (!loading) return emptyFunction();
    const redirect = () => {
      history.push(`${from.pathname}`);
      window.location.reload();
    };
    const login = async () => {
      await requestAuthLogin(credentials)
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          setMessage({ text: "Success", success: true });
          _debounce(redirect(), 3000);
        })
        .catch((error) => {
          setLoading(false);
          setMessage({ text: error.response.data, success: false });
        });
    };
    login();
  }, [loading, credentials, from, history]);

  if (auth.authenticated) return <Redirect to={`${from.pathname}`} />;

  return (
    <LoginPage
      clearError={clearError}
      message={message}
      handleLoginClick={(e) => {
        e.preventDefault();
        setLoading(true);
      }}
      history={history}
      loading={loading}
      onHandleChange={onHandleChange}
      positive={message.success}
      error={!message.success}
      message={message.text && message.text}
      handleDismiss={() => clearError()}
    />
  );
};

export default withRouter(LoginContainer);
