import React from "react";

import UIWrapper from "./UIWrapper";

const TabContainer = ({ children, mobile }) => {
  const displayStyle = {
    display: "flex",
    flexDirection: "column",
    margin: mobile ? "0 10px" : "0 39%",
    height: "73vh",
  };

  return <UIWrapper display={displayStyle}>{children}</UIWrapper>;
};

export default TabContainer;
