import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { requestAuthLogout, userInfo } from "../apis/apiRequests";
import { useFetch } from "../utils/hookUtils";
import { UserContext } from "../utils/contextUtils";
import { withRouter } from "react-router";
import MainContainer from "./MainContainer";

const AuthContainer = ({ children, history, location }) => {
  const { from } = location.state || { from: { pathname: "/" } };

  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(userData);

  const [userData, isLoading] = useFetch(userInfo);

  const authListener = (user, cb) => {
    if (!user) return;
    setUser(user);
    setAuthenticated(true);
    cb && cb();
  };

  const handleLogOut = async (reload) =>
    await requestAuthLogout()
      .then(() => history.push("/login"))
      .catch(() => {
        history.push("/login");
        reload && window.location.reload();
      });

  useEffect(() => {
    if (!userData) return;
    authListener(userData.data, history.push(`${from.pathname}`));
  }, [userData]);

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
