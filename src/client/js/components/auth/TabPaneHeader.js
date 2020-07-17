import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Header, Loader } from "semantic-ui-react";

import { getUserInitials, stringsEqual } from "../../utils/appUtils";
import { useAuth, useMainContext } from "../../utils/hookUtils";
import UIButton from "../cardDetail/UIButton";
import UIContainer from "../sharedComponents/UIContainer";
import UIWrapper from "../sharedComponents/UIWrapper";
import UserAvatar from "../sharedComponents/UserAvatar";

const Small = styled.span`
  font-size: 14px;
  line-height: 20px;
  color: #5e6c84;
`;

const TabPaneHeader = ({ alertText, history }) => {
  const { user } = useAuth();
  const { device } = useMainContext();

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

TabPaneHeader.propTypes = {
  alertText: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default TabPaneHeader;
