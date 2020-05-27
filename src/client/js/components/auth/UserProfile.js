import React, { useContext, useEffect } from "react";

import { MainContext } from "../../utils/contextUtils";
import { useAuth } from "../../utils/hookUtils";
import TabPaneHeader from "./TabPaneHeader";
import TabProfileContent from "./TabProfileContent";
import UIContainer from "../sharedComponents/UIContainer";
import { emptyFunction } from "../../utils/appUtils";
import { requestAuthLogin } from "../../apis/apiRequests";
import { getQueryString } from "../../utils/urls";

const displayStyle = {
  height: "97vh",
  display: "flex",
  flexDirection: "column",
};

const UserProfile = ({ history }) => {
  const { device } = useContext(MainContext);
  const { user, auth } = useAuth();

  useEffect(() => {
    const email = getQueryString(history.location);
    if (!email) return emptyFunction;
    const body = { email };
    const loginUser = async () => {
      await requestAuthLogin(body).then(() => {
        auth.authListener();
        history.push("/profile");
      });
    };
    email && loginUser();
  }, [user, auth, history]);

  return (
    <UIContainer padding="0" display={displayStyle}>
      <TabPaneHeader user={user} device={device} />
      <TabProfileContent user={user} device={device} />
    </UIContainer>
  );
};

export default UserProfile;
