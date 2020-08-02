import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import { requestAuthLogout, userInfo } from "../apis/apiRequests";
import { UserContext } from "../utils/contextUtils";
import MainContainer from "./MainContainer";

const AuthContainer = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(undefined);

  const authListener = useCallback((user, cb) => {
    if (!user) return;
    setUser(user);
    cb && cb();
  }, []);

  const handleLogOut = async () =>
    await requestAuthLogout()
      .then(() => {
        authListener(undefined, window.location.reload());
      })
      .catch(() => {
        setIsLoading(false);
        authListener(undefined, window.location.reload());
      });

  useEffect(() => {
    setAuthenticated(user !== undefined && user !== null);
  }, [user]);

  useEffect(() => {
    setIsLoading(true);
    const fetchUserInfo = async () => {
      await userInfo()
        .then((res) => {
          setIsLoading(false);
          authListener(res.data);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    };
    fetchUserInfo();
  }, [authListener]);

  return (
    <UserContext.Provider
      value={{
        auth: { authenticated, authListener },
        handleLogOut,
        isLoading,
        setIsLoading,
        user,
      }}
    >
      <MainContainer>{children}</MainContainer>
    </UserContext.Provider>
  );
};

AuthContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthContainer;
