import React from "react";

import { Icon } from "semantic-ui-react";

const NavButtonIcon = ({ iconName, iconColor }) => (
  <Icon name={iconName} className="nav-button-icon" color={iconColor} />
);

export default NavButtonIcon;
