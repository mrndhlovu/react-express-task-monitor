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
  const [message, setMessage] = useState({ text: null, success: null });
  const [loading, setLoading] = useState(false);

  const onHandleChange = (e) => {
    const { value, name } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const clearError = () => {
    setMessage({ ...message, text: null, success: null });
    resetForm("reset-email-input");
  };

  useEffect(() => {
    if (!loading) return emptyFunction();

    const recoverPassword = async () => {
      await requestEmailRecovery(credentials)
        .then((res) => {
          setLoading(false);
          setMessage({ ...message, text: res.data.message, success: true });
        })
        .catch((error) => {
          setLoading(false);
          setMessage({
            ...message,
            text: error.response.data.message,
            success: false,
          });
        });
    };
    recoverPassword();
  }, [loading, credentials, history]);

  if (auth.authenticated) return <Redirect to={`${from.pathname}`} />;

  return (
    <EmailRecovery
      clearError={clearError}
      handleEmailPassword={(e) => {
        e.preventDefault();
        setLoading(true);
      }}
      history={history}
      loading={loading}
      onHandleChange={onHandleChange}
      message={message}
      disabled={!credentials.email}
    />
  );
};

export default withRouter(EmailRecoveryContainer);
