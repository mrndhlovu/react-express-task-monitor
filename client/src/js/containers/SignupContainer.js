import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";

import { AppContext } from "../utils/contextUtils";
import { requestAuthSignup } from "../apis/apiRequests";
import { resetForm } from "../utils/appUtils";
import SignupPage from "../components/auth/SignupPage";

const SignupContainer = ({ history }) => {
  const { authenticated } = useContext(AppContext).auth;
  const [error, setError] = useState(null);
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

  useEffect(() => {
    if (!loading) return;
    const handleRedirect = async () => {
      setLoading(true);
      await requestAuthSignup(credentials)
        .then(res => {
          localStorage.setItem("user", JSON.stringify(res.data));
          if (res.status === 201) {
            history.push("/");
            window.location.reload();
          }
        })
        .catch(error => setError(error.response.data));
    };
    handleRedirect();
    setLoading(false);
  }, [history, authenticated, loading, credentials]);

  return (
    <SignupPage
      onHandleChange={onHandleChange}
      handleSignupClick={() => setLoading(true)}
      history={history}
      error={error}
      clearError={clearError}
      loading={loading}
    />
  );
};

export default withRouter(SignupContainer);
