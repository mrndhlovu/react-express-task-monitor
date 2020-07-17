import React from "react";
import PropTypes from "prop-types";

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

TabContainer.propTypes = {
  children: PropTypes.element.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default TabContainer;
