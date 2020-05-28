import React, { useContext, useEffect, useState } from "react";

import { emptyFunction } from "../../utils/appUtils";
import { getQueryString } from "../../utils/urls";
import { MainContext } from "../../utils/contextUtils";
import { requestAuthLogin } from "../../apis/apiRequests";
import { useAuth } from "../../utils/hookUtils";
import TabPaneHeader from "./TabPaneHeader";
import TabProfileContent from "./TabProfileContent";
import UIContainer from "../sharedComponents/UIContainer";

const displayStyle = {
  height: "97vh",
  display: "flex",
  flexDirection: "column",
};

const UserProfile = ({ history }) => {
  const { device } = useContext(MainContext);
  const { user, auth } = useAuth();

  const [alertText, setAlertText] = useState("Login to access this page!");

  useEffect(() => {
    const urlParams = getQueryString(history.location);

    if (!urlParams) return emptyFunction();
    const paramsArray = urlParams.split("&");
    const token = paramsArray[0];
    const email = paramsArray[1].split("=").pop();

    if (!token) return emptyFunction;
    setAlertText("Loading!");

    const loginUser = async () => {
      await requestAuthLogin({ email }, token)
        .then(() => {
          auth.authListener();
          history.push("/profile");
        })
        .catch(() => {
          setAlertText("Loading to access this page!");
        });
    };
    token && email && loginUser();
  }, [user, auth, history]);

  return (
    <UIContainer padding="0" display={displayStyle}>
      <TabPaneHeader
        user={user}
        device={device}
        alertText={alertText}
        history={history}
      />
      {user && <TabProfileContent user={user} device={device} />}
    </UIContainer>
  );
};

export default UserProfile;
