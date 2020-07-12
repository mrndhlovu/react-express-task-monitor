import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";

import { requestUpdatePassword } from "../apis/apiRequests";
import { resetForm, emptyFunction } from "../utils/appUtils";
import { useAuth, useMainContext } from "../utils/hookUtils";
import ResetPassword from "../components/auth/ResetPassword";

const ResetPasswordContainer = ({ history, location }) => {
  const { from } = location.state || { from: { pathname: "/" } };
  const { alertUser } = useMainContext();

  const { auth } = useAuth();
  const [credentials, setCredentials] = useState({
    password: null,
    confirmPassword: null,
  });
  const [save, setSave] = useState(false);
  const [passwordChanged, setPasswordConfirmed] = useState(false);

  const onHandleChange = (e) => {
    const { value, name } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const clearError = () => {
    resetForm("password-input");
    resetForm("password-confirm-input");
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    setSave(true);
  };

  useEffect(() => {
    if (!save) return emptyFunction();

    const updatePassword = async () => {
      const token = history.location.pathname.split("/").pop();
      const body = {
        password: credentials.password,
        confirmPassword: credentials.confirmPassword,
      };

      await requestUpdatePassword(body, token)
        .then((res) => {
          setSave(false);
          setPasswordConfirmed(true);
          alertUser(res.data.message, true);
        })
        .catch((error) => {
          setSave(false);
          alertUser(error.response.data.message, false, () => clearError());
        });
    };
    updatePassword();
  }, [save, credentials, history, alertUser]);

  if (auth.authenticated) return <Redirect to={`${from.pathname}`} />;

  return (
    <ResetPassword
      passwordChanged={passwordChanged}
      handleSaveClick={handleSaveClick}
      history={history}
      save={save}
      onHandleChange={onHandleChange}
      disabled={!credentials.password || !credentials.confirmPassword}
    />
  );
};

export default withRouter(ResetPasswordContainer);
