import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";

import { requestAuthLogin } from "../apis/apiRequests";
import { resetForm, emptyFunction } from "../utils/appUtils";
import { useAuth, useAlert } from "../utils/hookUtils";
import LoginPage from "../components/auth/LoginPage";

const LoginContainer = ({ history, location, user }) => {
  const { from } = location.state || { from: { pathname: "/" } };

  const { notify } = useAlert();

  const auth = user || useAuth().auth;
  const [credentials, setCredentials] = useState({
    password: null,
    email: null,
  });
  const [loading, setLoading] = useState(false);

  const onHandleChange = (e) => {
    const { value, name } = e.target;

    setCredentials({ ...credentials, [name]: value });
  };

  useEffect(() => {
    if (!loading) return emptyFunction();
    const redirect = () => {
      history.push(`${from.pathname}`);
      window.location.reload();
    };
    const login = async () => {
      await requestAuthLogin(credentials)
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          notify({ message: "Login success!", success: true });
          setTimeout(() => {
            redirect();
          }, 500);
        })
        .catch((error) => {
          notify({
            message: error.response.data,
            cb: () => {
              setCredentials({
                password: null,
                email: null,
              });
              resetForm("authForm");
            },
          });

          setLoading(false);
        });
    };
    login();
  }, [loading, credentials, from, history]);

  if (auth.authenticated) return <Redirect to={`${from.pathname}`} />;

  return (
    <LoginPage
      handleLoginClick={(e) => {
        e.preventDefault();
        setLoading(true);
      }}
      history={history}
      loading={loading}
      onHandleChange={onHandleChange}
    />
  );
};

export default withRouter(LoginContainer);
