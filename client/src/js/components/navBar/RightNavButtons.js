import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Accordion, Icon } from "semantic-ui-react";

import { useAuth, useMainContext } from "../../utils/hookUtils";
import DropdownButton from "../sharedComponents/DropdownButton";
import NavUserAvatar from "../sharedComponents/NavUserAvatar";
import UIWrapper from "../sharedComponents/UIWrapper";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const RightNavButtons = ({ history }) => {
  const { user, handleLogOut } = useAuth();
  const { updateUserRequestHandler } = useMainContext();
  const [activeIndex, setActiveIndex] = useState(null);
  const unreadNotification = user.notifications.filter(
    (notification) => !notification.read
  );
  const hasUnreadNotification = unreadNotification.length > 0;
  const hasNotifications = user.notifications.length > 0;

  const openNotificationHandler = (notification, index) => {
    setActiveIndex(index === activeIndex ? null : index);
    if (!notification.read) {
      user.notifications.splice(index, 1, { ...notification, read: true });
      updateUserRequestHandler({ notifications: user.notifications });
    }
  };

  return (
    <StyledDiv>
      <DropdownButton
        icon="bell"
        labeled={false}
        className="navButton"
        header="Notifications"
        compact={false}
        size="tiny"
        margin="0 3px"
        closeOnSelect={true}
        notificationCount={hasUnreadNotification && unreadNotification.length}
        iconColor={hasUnreadNotification ? "red" : "black"}
      >
        <UIWrapper className="notifications">
          {hasNotifications ? (
            user.notifications.map((notification, index) => {
              return (
                <Accordion key={index}>
                  <Accordion.Title
                    active={activeIndex === index}
                    index={0}
                    onClick={() => openNotificationHandler(notification, index)}
                    className={`single-notification ${
                      notification.read ? "note-read" : "note-unread"
                    }`}
                  >
                    <Icon name="dropdown" />
                    {notification.subject}
                  </Accordion.Title>
                  <Accordion.Content
                    className="notification-description"
                    active={activeIndex === index}
                  >
                    <p>{notification.description}</p>
                  </Accordion.Content>
                </Accordion>
              );
            })
          ) : (
            <p>Not new notifications</p>
          )}
        </UIWrapper>
      </DropdownButton>
      <NavUserAvatar
        className="navButton"
        userName={user.fname}
        history={history}
        fontSize="13px"
        handleLogOut={() => handleLogOut(history.push("/login"))}
      />
    </StyledDiv>
  );
};

RightNavButtons.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default RightNavButtons;
