import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";

import { requestAuthSignup } from "../apis/apiRequests";
import { resetForm } from "../utils/appUtils";
import SignupPage from "../components/auth/SignupPage";
import { useAuth } from "../utils/hookUtils";

const SignupContainer = ({ history }) => {
  const { auth } = useAuth();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setError(null);
    resetForm("authForm");
  };

  useEffect(() => {
    if (!loading) return;
    const handleRedirect = async () => {
      setLoading(true);
      await requestAuthSignup(credentials)
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          if (res.status === 201) {
            history.push("/");
          }
        })
        .catch((error) => setError(error.response.data));
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
      error={error && { list: error }}
      clearError={clearError}
      loading={loading}
      disabled={
        !credentials.email || !credentials.fname || !credentials.password
      }
    />
  );
};

export default withRouter(SignupContainer);
