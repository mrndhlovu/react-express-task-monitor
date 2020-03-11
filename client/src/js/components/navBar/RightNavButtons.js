import React, { useContext } from "react";
import styled from "styled-components";

import { AppContext } from "../../utils/contextUtils";
import NavButton from "../sharedComponents/NavButton";
import UserAvatar from "../sharedComponents/UserAvatar";
import { getUserInitials } from "../../utils/appUtils";
import { Dropdown } from "semantic-ui-react";
import { requestAuthLogout } from "../../apis/apiRequests";

const StyledDiv = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const RightNavButtons = () => {
  const { device, auth } = useContext(AppContext);

  const handleLogOut = async () => {
    await requestAuthLogout(auth.token).then(res => window.location.reload());
  };

  const trigger = (
    <>
      {auth.data && (
        <UserAvatar userInitials={getUserInitials(auth.data.fname)} />
      )}
    </>
  );

  return (
    <StyledDiv>
      <NavButton iconName="add" />

      {!device.mobile && <NavButton iconName="attention" />}

      <NavButton iconName="bell" />

      {auth.data && (
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
