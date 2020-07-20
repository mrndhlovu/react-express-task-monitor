import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { UserContext } from "../utils/contextUtils";
import { userInfo, requestAuthLogout } from "../apis/apiRequests";
import { withRouter } from "react-router";
import MainContainer from "./MainContainer";

const AuthContainer = ({ children, history, location }) => {
  const { from } = location.state || { from: { pathname: "/" } };

  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const authListener = (user, cb) => {
    if (!user) return;
    setUser(user);
    setAuthenticated(true);
    cb && cb();
  };

  const handleLogOut = async () =>
    await requestAuthLogout().then(() => history.push("/login"));

  useEffect(() => {
    if (user) return;
    const getCurrentUser = async () => {
      setIsLoading(true);
      await userInfo()
        .then((res) => {
          setIsLoading(false);
          authListener(res.data.data, history.push(`${from.pathname}`));
        })
        .catch(() => {
          setIsLoading(false);
          setAuthenticated(false);
          localStorage.clear();
        });
    };
    getCurrentUser();
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        alert,
        auth: { authenticated, authListener },
        handleLogOut,
        isLoading,
        user,
      }}
    >
      <MainContainer>{children}</MainContainer>
    </UserContext.Provider>
  );
};

AuthContainer.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.oneOfType([
    PropTypes.shape({
      state: PropTypes.shape({
        from: PropTypes.shape({ pathname: PropTypes.string }),
      }),
    }),
  ]),
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
};

export default withRouter(AuthContainer);
