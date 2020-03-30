import React, { useContext } from "react";
import styled from "styled-components";

import { AppContext } from "../../utils/contextUtils";
import { Dropdown } from "semantic-ui-react";
import { getUserInitials } from "../../utils/appUtils";
import { requestAuthLogout } from "../../apis/apiRequests";
import NavButton from "../sharedComponents/NavButton";
import UserAvatar from "../sharedComponents/UserAvatar";

const StyledDiv = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const RightNavButtons = () => {
  const { auth } = useContext(AppContext);

  const handleLogOut = async () => {
    await requestAuthLogout().then(res => {
      localStorage.removeItem("user");
      window.location.reload();
    });
  };

  const trigger = (
    <>
      {auth.user && (
        <UserAvatar userInitials={getUserInitials(auth.user.fname)} />
      )}
    </>
  );

  return (
    <StyledDiv>
      <NavButton iconName="bell" />
      {auth.user && (
        <Dropdown trigger={trigger} pointing="top right" icon={null}>
          <Dropdown.Menu>
            <Dropdown.Item text="Profile and Visibility" />
            <Dropdown.Item text="Log out" onClick={() => handleLogOut()} />
          </Dropdown.Menu>
        </Dropdown>
      )}
    </StyledDiv>
  );
};

export default RightNavButtons;
