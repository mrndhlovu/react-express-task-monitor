import React, { useContext } from "react";

import { MainContext } from "../../utils/contextUtils";
import { useAuth } from "../../utils/hookUtils";
import TabPaneHeader from "./TabPaneHeader";
import TabProfileContent from "./TabProfileContent";
import UIContainer from "../sharedComponents/UIContainer";

const displayStyle = {
  height: "97vh",
  display: "flex",
  flexDirection: "column",
};

const UserProfile = () => {
  const { device } = useContext(MainContext);
  const { user } = useAuth();

  return (
    <UIContainer padding="0" display={displayStyle}>
      <TabPaneHeader user={user} device={device} />
      <TabProfileContent user={user} device={device} />
    </UIContainer>
  );
};

export default UserProfile;
