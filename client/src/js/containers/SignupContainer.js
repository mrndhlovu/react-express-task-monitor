import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";

import { MainContext } from "../utils/contextUtils";
import { requestAuthSignup } from "../apis/apiRequests";
import { resetForm } from "../utils/appUtils";
import SignupPage from "../components/auth/SignupPage";

const SignupContainer = ({ history }) => {
  const { authenticated } = useContext(MainContext).auth;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [credentials, setCredentials] = useState({
    fname: null,
    password: null,
    email: null,
  });

  const onHandleChange = (e) => {
    const value = e.target.value;
    const type = e.target.type;

    setCredentials({
      ...credentials,
      [type === "text" ? "fname" : type]: value,
    });
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
            window.location.reload();
          }
        })
        .catch((error) => setError(error.response.data));
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
      disabled={
        !credentials.email || !credentials.fname || !credentials.password
      }
    />
  );
};

export default withRouter(SignupContainer);
