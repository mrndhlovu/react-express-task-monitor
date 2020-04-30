import React from "react";
import styled from "styled-components";

import { Header } from "semantic-ui-react";

import UIContainer from "../sharedComponents/UIContainer";
import UserAvatar from "../sharedComponents/UserAvatar";
import { getUserInitials } from "../../utils/appUtils";
import UIWrapper from "../sharedComponents/UIWrapper";

const displayStyle = {
  alignItems: "center",
  background: "#f4f5f7",
  display: "flex",
  height: "20vh",
  justifyContent: "center",
};

const Small = styled.span`
  font-size: 15px;
`;

const TabPaneHeader = ({ user }) => {
  return (
    <UIContainer display={displayStyle}>
      <UserAvatar
        fontSize="20px"
        padding="25px"
        userInitials={user && getUserInitials(user.fname)}
      />
      <UIWrapper padding="0 25">
        <Header as="h1" content={user && user.fname} />
      </UIWrapper>
      <Small>{user && `@${user.username}`}</Small>
    </UIContainer>
  );
};

export default TabPaneHeader;
