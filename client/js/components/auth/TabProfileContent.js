import React from "react";

import { Tab } from "semantic-ui-react";

import UIContainer from "../sharedComponents/UIContainer";
import PersonalInfo from "./PersonalInfo";

const displayStyle = {
  marginTop: "-43px",
  height: "80vh",
};

const TabProfileContent = ({ user }) => {
  const panes = [
    {
      menuItem: "Profile and Visibility",
      render: () => (
        <Tab.Pane className="tab-container">
          <PersonalInfo user={user} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Settings",
      render: () => (
        <Tab.Pane className="tab-container">Tab 2 Content</Tab.Pane>
      ),
    },
    {
      menuItem: "Billing",
      render: () => (
        <Tab.Pane className="tab-container">Tab 3 Content</Tab.Pane>
      ),
    },
  ];

  return (
    <UIContainer display={displayStyle} padding="0">
      <Tab as={"div"} defaultActiveIndex={0} panes={panes} />
    </UIContainer>
  );
};

export default TabProfileContent;
