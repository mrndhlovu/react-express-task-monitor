import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";

import _debounce from "debounce";
import { requestAuthSignup } from "../apis/apiRequests";
import { resetForm } from "../utils/appUtils";
import { useAuth, useAlert } from "../utils/hookUtils";
import SignupPage from "../components/auth/SignupPage";

const SignupContainer = ({ history }) => {
  const { auth } = useAuth();
  const { notify } = useAlert();

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

  useEffect(() => {
    if (!loading) return;
    const handleRedirect = async () => {
      setLoading(true);
      await requestAuthSignup(credentials)
        .then((res) => {
          notify({ message: "Success", success: true });
          localStorage.setItem("user", JSON.stringify(res.data));
          if (res.status === 201) _debounce(window.location.reload(), 3000);
        })
        .catch((error) =>
          notify({
            message: error.response.data,
            cb: () => resetForm("authForm"),
          })
        );
    };
    handleRedirect();
    setLoading(false);
  }, [history, loading, credentials]);

  if (auth.authenticated) return <Redirect to="/" />;

  return (
    <SignupPage
      onHandleChange={onHandleChange}
      handleSignupClick={(e) => {
        e.preventDefault();
        setLoading(true);
      }}
      history={history}
      loading={loading}
    />
  );
};

export default withRouter(SignupContainer);
