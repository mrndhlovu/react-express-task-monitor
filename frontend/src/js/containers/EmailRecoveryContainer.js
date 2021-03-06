import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { requestEmailRecovery } from "../apis/apiRequests";
import { resetForm, emptyFunction } from "../utils/appUtils";
import { useAuth, useMainContext } from "../utils/hookUtils";
import EmailRecovery from "../components/auth/EmailRecovery";

const EmailRecoveryContainer = ({ history, location }) => {
  const { from } = location.state || { from: { pathname: "/" } };
  const { alertUser } = useMainContext();

  const { auth } = useAuth();
  const [credentials, setCredentials] = useState({ email: null });
  const [loading, setLoading] = useState(false);

  const onHandleChange = (e) => {
    const { value, name } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  useEffect(() => {
    if (!loading) return emptyFunction();

    const clearMsg = (redirect) => {
      setCredentials({ email: null });
      resetForm("reset-email-input");
      redirect && history.push("/login");
    };

    const recoverPassword = async () => {
      await requestEmailRecovery(credentials)
        .then((res) => {
          setLoading(false);
          alertUser(res.data.message, true, () => clearMsg(true));
        })
        .catch((error) => {
          setLoading(false);
          alertUser(error.response?.data.message, false, () => clearMsg());
        });
    };
    recoverPassword();
  }, [loading, credentials, history, alertUser]);

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

EmailRecoveryContainer.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({ from: PropTypes.string.isRequired }),
  }),
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
};

export default withRouter(EmailRecoveryContainer);
