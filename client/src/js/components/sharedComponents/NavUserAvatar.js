import React from "react";

import { Dropdown } from "semantic-ui-react";
import { getUserInitials } from "../../utils/appUtils";
import { requestAuthLogout } from "../../apis/apiRequests";
import UserAvatar from "../sharedComponents/UserAvatar";

const NavUserAvatar = ({ auth }) => {
  const handleLogOut = async () => {
    await requestAuthLogout().then((res) => {
      localStorage.removeItem("user");
      window.location.reload();
    });
  };

  const trigger = (
    <UserAvatar userInitials={getUserInitials(auth.user.fname)} />
  );

  return (
    <Dropdown trigger={trigger} pointing="top right" icon={null}>
      <Dropdown.Menu>
        <Dropdown.Item text="Profile and Visibility" />
        <Dropdown.Item text="Log out" onClick={() => handleLogOut()} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavUserAvatar;
