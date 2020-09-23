import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import { emptyFunction } from "../utils/appUtils";
import { requestAuthLogout, userInfo } from "../apis/apiRequests";
import { UserContext } from "../utils/contextUtils";
import MainContainer from "./MainContainer";
import UIAlert from "../components/shared/UIAlert";

const INITIAL_STATE = {
  reason: null,
  message: null,
  success: false,
  cb: emptyFunction,
};

const AuthContainer = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(undefined);
  const [alert, setAlert] = useState(INITIAL_STATE);

  const alertUser = useCallback(
    (message, success = false, cb = () => {}, reason) =>
      setAlert({ ...INITIAL_STATE, reason, message, success, cb }),
    []
  );

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
        .catch(() => {
          setIsLoading(false);
        });
    };
    fetchUserInfo();
  }, [authListener, alertUser]);

  return (
    <UserContext.Provider
      value={{
        auth: { authenticated, authListener },
        handleLogOut,
        isLoading,
        setIsLoading,
        user,
        alertUser,
      }}
    >
      <MainContainer>{children}</MainContainer>
      <UIAlert alert={alert} alertUser={alertUser} />
    </UserContext.Provider>
  );
};

AuthContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthContainer;
