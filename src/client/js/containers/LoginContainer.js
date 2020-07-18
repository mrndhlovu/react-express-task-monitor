import React, { useState } from "react";
import { withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { requestAuthLogin } from "../apis/apiRequests";
import { useAuth, useMainContext } from "../utils/hookUtils";
import LoginPage from "../components/auth/LoginPage";

const LoginContainer = ({ history, location }) => {
  const { from } = location.state || { from: { pathname: "/" } };
  const { alertUser } = useMainContext();
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
      .then((res) =>
        authListener(res.data, () => {
          setLoading(false);
          history.push("/");
        })
      )
      .catch((error) => {
        setLoading(false);
        alertUser(error.response.data, false, () => {
          setCredentials({
            password: null,
            email: null,
          });
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

LoginContainer.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({ from: PropTypes.string.isRequired }),
  }),
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
};

export default withRouter(LoginContainer);
