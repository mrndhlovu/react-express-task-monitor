import React from "react";

import HomeSidebarButton from "../sharedComponents/HomeSidebarButton";
import UIContainer from "../sharedComponents/UIContainer";

const HomeSideMenu = ({ history, className, callback = () => {} }) => {
  return (
    <UIContainer className={className}>
      <HomeSidebarButton
        onClick={() => {
          history.push("/templates");
          callback();
        }}
        buttonText="Templates"
        iconName="object ungroup outline"
      />
    </UIContainer>
  );
};

export default HomeSideMenu;
