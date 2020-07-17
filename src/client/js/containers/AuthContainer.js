import React, { useState, useEffect } from "react";

import { UserContext } from "../utils/contextUtils";
import { userInfo } from "../apis/apiRequests";
import { withRouter } from "react-router";
import MainContainer from "./MainContainer";

const AuthContainer = ({ children, history, location }) => {
  const { from } = location.state || { from: { pathname: "/" } };
  const [alert, setAlert] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const authListener = (user, cb) => {
    if (!user) return;
    setUser(user);
    setAuthenticated(true);
    cb && cb();
  };

  useEffect(() => {
    if (user) return;
    const getCurrentUser = async () => {
      await userInfo()
        .then((res) => {
          authListener(res.data.data, history.push(`${from.pathname}`));
        })
        .catch((error) => {
          setAlert(error.response.data);
          setAuthenticated(false);
          localStorage.clear();
        });
    };
    getCurrentUser();
  }, [user]);

  return (
    <UserContext.Provider
      value={{ auth: { authenticated, authListener }, user, alert, setAlert }}
    >
      <MainContainer>{children}</MainContainer>
    </UserContext.Provider>
  );
};

export default withRouter(AuthContainer);
