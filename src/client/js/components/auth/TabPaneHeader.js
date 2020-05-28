import React from "react";
import styled from "styled-components";

import { Header, Loader } from "semantic-ui-react";

import { getUserInitials, stringsEqual } from "../../utils/appUtils";
import UIContainer from "../sharedComponents/UIContainer";
import UIWrapper from "../sharedComponents/UIWrapper";
import UserAvatar from "../sharedComponents/UserAvatar";
import UIButton from "../cardDetail/UIButton";

const Small = styled.span`
  font-size: 14px;
  line-height: 20px;
  color: #5e6c84;
`;

const TabPaneHeader = ({ user, device, alertText, history }) => {
  const displayStyle = {
    alignItems: "center",
    background: "#f4f5f7",
    display: "flex",
    height: device.mobile ? "26vh" : "20vh",
    justifyContent: "center",
  };

  return (
    <UIContainer display={displayStyle}>
      {user ? (
        <UserAvatar
          fontSize="20px"
          padding="25px"
          userInitials={user && getUserInitials(user.fname)}
        />
      ) : (
        <>
          <span className="no-user-profile">
            {alertText}
            {stringsEqual(alertText, "Loading!") && (
              <Loader size="mini" active inline />
            )}
          </span>
          <UIWrapper>
            <UIButton content="Login" onClick={() => history.push("/")} />
          </UIWrapper>
        </>
      )}
      <UIWrapper padding="0 25">
        <Header as="h1" content={user && user.fname} />
      </UIWrapper>
      <Small>{user && `@${user.username}`}</Small>
    </UIContainer>
  );
};

export default TabPaneHeader;
