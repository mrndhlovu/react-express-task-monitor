import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";

import { requestAuthSignup } from "../apis/apiRequests";
import { resetForm } from "../utils/appUtils";
import SignupPage from "../components/auth/SignupPage";
import { useAuth } from "../utils/hookUtils";
import _debounce from "debounce";

const SignupContainer = ({ history }) => {
  const { auth } = useAuth();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: null, success: null });
  const [credentials, setCredentials] = useState({
    fname: null,
    password: null,
    email: null,
  });

  const onHandleChange = (e) => {
    const { value, name } = e.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const clearError = () => {
    setMessage({ text: null, success: null });
    resetForm("authForm");
  };

  useEffect(() => {
    if (!loading) return;
    const handleRedirect = async () => {
      setLoading(true);
      await requestAuthSignup(credentials)
        .then((res) => {
          setMessage({ text: "Success", success: true });
          localStorage.setItem("user", JSON.stringify(res.data));
          if (res.status === 201) _debounce(window.location.reload(), 3000);
        })
        .catch((error) =>
          setMessage({ text: error.response.data, success: false })
        );
    };
    handleRedirect();
    setLoading(false);
  }, [history, loading, credentials]);

  if (auth.authenticated) return <Redirect to="/" />;

  return (
    <SignupPage
      onHandleChange={onHandleChange}
      handleSignupClick={(e) => {
        e.preventDefault();
        setLoading(true);
      }}
      history={history}
      clearError={clearError}
      loading={loading}
      positive={message.success}
      error={!message.success}
      message={message.text && message.text}
      handleDismiss={() => clearError()}
    />
  );
};

export default withRouter(SignupContainer);
