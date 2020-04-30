import React from "react";

import { Dropdown } from "semantic-ui-react";
import { getUserInitials } from "../../utils/appUtils";
import { requestAuthLogout } from "../../apis/apiRequests";
import UserAvatar from "./UserAvatar";

const NavUserAvatar = ({ userName, history }) => {
  const handleLogOut = async () => {
    await requestAuthLogout().then((res) => {
      localStorage.removeItem("user");
      window.location.reload();
    });
  };

  const trigger = <UserAvatar userInitials={getUserInitials(userName)} />;

  return (
    <Dropdown size="huge" trigger={trigger} pointing="top right" icon={null}>
      <Dropdown.Menu>
        <Dropdown.Item
          text="Profile and Visibility"
          onClick={() => (history ? history.push("/profile") : {})}
        />
        <Dropdown.Item text="Log out" onClick={() => handleLogOut()} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavUserAvatar;
