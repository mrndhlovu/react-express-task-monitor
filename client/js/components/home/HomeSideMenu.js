import React from "react";

import HomeSidebarButton from "../sharedComponents/HomeSidebarButton";
import UIContainer from "../sharedComponents/UIContainer";

const style = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  padding: "10px 5px",
};

const HomeSideMenu = () => {
  return (
    <UIContainer display={style}>
      <HomeSidebarButton buttonText="Boards" iconName="target" />
      <HomeSidebarButton
        buttonText="Templates"
        iconName="object ungroup outline"
      />
    </UIContainer>
  );
};

export default HomeSideMenu;
