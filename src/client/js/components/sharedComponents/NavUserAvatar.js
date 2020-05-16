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
}) => {
  const handleLogOut = async () => {
    await requestAuthLogout().then(() => {
      localStorage.removeItem("user");
      window.location.reload();
    });
  };

  const trigger = <UserAvatar userInitials={getUserInitials(userName)} />;

  return (
    <Dropdown size="huge" trigger={trigger} pointing={pointing} icon={null}>
      <Dropdown.Menu>
        <Dropdown.Item
          text="Profile and Visibility"
          onClick={() => (history ? history.push("/profile") : {})}
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
