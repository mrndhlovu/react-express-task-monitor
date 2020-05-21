import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";

import { requestEmailRecovery } from "../apis/apiRequests";
import { resetForm, emptyFunction } from "../utils/appUtils";
import { useAuth } from "../utils/hookUtils";
import EmailRecovery from "../components/auth/EmailRecovery";
import withNotification from "../HOC/withNotification";

const EmailRecoveryContainer = ({ history, location, notify }) => {
  const { from } = location.state || { from: { pathname: "/" } };

  const { auth } = useAuth();
  const [credentials, setCredentials] = useState({ email: null });
  const [loading, setLoading] = useState(false);

  const onHandleChange = (e) => {
    const { value, name } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const clearMsg = () => {
    setCredentials({ email: null });
    resetForm("reset-email-input");
    history.push("/login");
  };

  useEffect(() => {
    if (!loading) return emptyFunction();

    const recoverPassword = async () => {
      await requestEmailRecovery(credentials)
        .then((res) => {
          setLoading(false);
          notify({
            message: res.data.message,
            success: true,
            cb: () => clearMsg(),
          });
        })
        .catch((error) => {
          setLoading(false);
          notify({
            message: error.response.data.message,
            cb: () => clearMsg(),
          });
        });
    };
    recoverPassword();
  }, [loading, credentials, history]);

  if (auth.authenticated) return <Redirect to={`${from.pathname}`} />;

  return (
    <EmailRecovery
      handleEmailPassword={(e) => {
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

export default withRouter(withNotification(EmailRecoveryContainer));
