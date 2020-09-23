import React from "react";
import PropTypes from "prop-types";

import { Icon } from "semantic-ui-react";

const NavButtonIcon = ({ iconName, iconColor }) => (
  <Icon name={iconName} className="nav-button-icon" color={iconColor} />
);

NavButtonIcon.propTypes = {
  iconName: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
};

export default NavButtonIcon;
