import React from "react";

import UIWrapper from "./UIWrapper";

const displayStyle = {
  display: "flex",
  flexDirection: "column",
  margin: "0 35%",
};

const TabContainer = ({ children }) => {
  return <UIWrapper display={displayStyle}>{children}</UIWrapper>;
};

export default TabContainer;
