import React from "react";
import PropTypes from "prop-types";

import { Dropdown } from "semantic-ui-react";

import { getUserInitials } from "../../utils/appUtils";
import UserAvatar from "./UserAvatar";

const NavUserAvatar = ({
  userName,
  history,
  pointing = "top right",
  callback = () => {},
  fontSize,
  className,
  handleLogOut,
}) => {
  const trigger = (
    <UserAvatar
      padding="18px"
      userInitials={getUserInitials(userName)}
      fontSize={fontSize}
      className={className}
    />
  );

  return (
    <Dropdown trigger={trigger} pointing={pointing} icon={null}>
      <Dropdown.Menu>
        <Dropdown.Item
          text="Profile and Visibility"
          onClick={() => {
            callback();
            history && history.push("/profile");
          }}
        />
        <Dropdown.Item
          text="Log out"
          onClick={() => {
            handleLogOut();
            callback();
          }}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
};

NavUserAvatar.propTypes = {
  userName: PropTypes.string.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  pointing: PropTypes.string,
  callback: PropTypes.func,
  fontSize: PropTypes.string,
  className: PropTypes.string,
  handleLogOut: PropTypes.func.isRequired,
};

export default NavUserAvatar;
