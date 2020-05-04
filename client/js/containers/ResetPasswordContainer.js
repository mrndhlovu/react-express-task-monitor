import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";

import { requestUpdatePassword } from "../apis/apiRequests";
import { resetForm, emptyFunction } from "../utils/appUtils";
import { useAuth } from "../utils/hookUtils";
import ResetPassword from "../components/auth/ResetPassword";

const ResetPasswordContainer = ({ history, location }) => {
  const { from } = location.state || { from: { pathname: "/" } };

  const { auth } = useAuth();
  const [credentials, setCredentials] = useState({
    password: null,
    confirmPassword: null,
  });
  const [error, setError] = useState(null);
  const [save, setSave] = useState(false);
  const [passwordChanged, setPasswordConfirmed] = useState(false);

  const onHandleChange = (e) => {
    const { value, name } = e.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const clearError = () => {
    setError(null);
    resetForm("authForm");
  };

  useEffect(() => {
    if (!save) return emptyFunction();

    const updatePassword = async () => {
      await requestUpdatePassword(credentials)
        .then((res) => {
          setSave(false);
          setPasswordConfirmed(true);
        })
        .catch((error) => {
          setSave(false);
          setError(error.response.data);
        });
    };
    updatePassword();
  }, [save, credentials, history]);

  if (auth.authenticated) return <Redirect to={`${from.pathname}`} />;

  return (
    <ResetPassword
      passwordChanged={passwordChanged}
      clearError={clearError}
      error={error && { list: error }}
      handleLoginClick={(e) => {
        e.preventDefault();
        setSave(true);
      }}
      history={history}
      save={save}
      onHandleChange={onHandleChange}
      disabled={
        (!credentials.password || !credentials.confirmPassword) &&
        !passwordChanged
      }
    />
  );
};

export default withRouter(ResetPasswordContainer);
