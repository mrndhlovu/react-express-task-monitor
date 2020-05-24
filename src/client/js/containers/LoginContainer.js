import React, { useState } from "react";
import { withRouter, Redirect } from "react-router-dom";

import { requestAuthLogin } from "../apis/apiRequests";
import { useAlert, useAuth } from "../utils/hookUtils";
import LoginPage from "../components/auth/LoginPage";

const LoginContainer = ({ history, location }) => {
  const { from } = location.state || { from: { pathname: "/" } };
  const { notify } = useAlert();
  const { authenticated, authListener } = useAuth().auth;

  const [credentials, setCredentials] = useState({
    password: null,
    email: null,
  });
  const [loading, setLoading] = useState(false);

  const onHandleChange = (e) => {
    const { value, name } = e.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await requestAuthLogin(credentials)
      .then(() => {
        notify({ message: "Login success!", success: true });
        authListener();
      })

      .catch((error) => {
        setLoading(false);
        notify({
          message: error.response.data,
          cb: () => {
            setCredentials({
              password: null,
              email: null,
            });
          },
        });
      });
  };

  if (authenticated) return <Redirect to={`${from.pathname}`} />;

  return (
    <LoginPage
      handleLoginClick={(e) => handleLogin(e)}
      history={history}
      loading={loading}
      onHandleChange={onHandleChange}
    />
  );
};

export default withRouter(LoginContainer);
