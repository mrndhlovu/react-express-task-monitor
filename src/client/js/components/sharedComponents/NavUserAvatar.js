import React from "react";

import { Dropdown } from "semantic-ui-react";

import { getUserInitials } from "../../utils/appUtils";
import { requestAuthLogout } from "../../apis/apiRequests";
import UserAvatar from "./UserAvatar";

const NavUserAvatar = ({
  userName,
  history,
  pointing = "top right",
  callback = () => {},
  fontSize,
}) => {
  const handleLogOut = async () =>
    await requestAuthLogout().then(() => history.push("/login"));

  const trigger = (
    <UserAvatar
      padding="15px"
      userInitials={getUserInitials(userName)}
      fontSize={fontSize}
    />
  );

  return (
    <Dropdown size="huge" trigger={trigger} pointing={pointing} icon={null}>
      <Dropdown.Menu>
        <Dropdown.Item
          text="Profile and Visibility"
          onClick={() => {
            callback();
            history ? history.push("/profile") : {};
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

export default NavUserAvatar;
