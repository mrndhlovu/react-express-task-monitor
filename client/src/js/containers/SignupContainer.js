import React, { useState } from "react";
import { withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { requestAuthSignup } from "../apis/apiRequests";
import { resetForm } from "../utils/appUtils";
import { useAuth, useMainContext } from "../utils/hookUtils";
import SignupPage from "../components/auth/SignupPage";

const SignupContainer = ({ history }) => {
  const { authenticated, authListener } = useAuth().auth;
  const { alertUser } = useMainContext();

  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    fname: null,
    password: null,
    email: null,
  });

  const onHandleChange = (e) => {
    const { value, name } = e.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    await requestAuthSignup(credentials)
      .then((res) => {
        authListener(res.data, () => history.push("/"));
      })
      .catch((error) =>
        alertUser(error.response?.data, false, () => {
          resetForm("authForm");
          setLoading(false);
        })
      );
  };

  if (authenticated) return <Redirect to="/" />;

  return (
    <SignupPage
      onHandleChange={onHandleChange}
      handleSignupClick={(e) => handleSignUp(e)}
      history={history}
      loading={loading}
    />
  );
};

SignupContainer.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
};

export default withRouter(SignupContainer);
