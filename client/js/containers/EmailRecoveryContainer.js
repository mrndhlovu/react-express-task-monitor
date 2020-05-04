import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";

import { requestEmailRecovery } from "../apis/apiRequests";
import { resetForm, emptyFunction } from "../utils/appUtils";
import { useAuth } from "../utils/hookUtils";
import EmailRecovery from "../components/auth/EmailRecovery";

const EmailRecoveryContainer = ({ history, location }) => {
  const { from } = location.state || { from: { pathname: "/" } };

  const { auth } = useAuth();
  const [credentials, setCredentials] = useState({ email: null });
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

    const recoverPassword = async () => {
      await requestEmailRecovery(credentials)
        .then((res) => {
          setLoading(false);
          history.push("/login");
          window.location.reload();
        })
        .catch((error) => {
          setLoading(false);
          setError(error.response.data);
        });
    };
    recoverPassword();
  }, [loading, credentials, history]);

  if (auth.authenticated) return <Redirect to={`${from.pathname}`} />;

  return (
    <EmailRecovery
      clearError={clearError}
      error={error && { list: error }}
      handleLoginClick={(e) => {
        e.preventDefault();
        setLoading(true);
      }}
      history={history}
      loading={loading}
      onHandleChange={onHandleChange}
      disabled={!credentials.email}
    />
  );
};

export default withRouter(EmailRecoveryContainer);
