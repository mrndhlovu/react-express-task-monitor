import React, { useState } from "react";
import styled from "styled-components";

import { Accordion, Icon } from "semantic-ui-react";

import { requestUserUpdate } from "../../apis/apiRequests";
import { useAuth, useMainContext } from "../../utils/hookUtils";
import DropdownButton from "../sharedComponents/DropdownButton";
import NavUserAvatar from "../sharedComponents/NavUserAvatar";
import UIWrapper from "../sharedComponents/UIWrapper";

const StyledDiv = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: baseline;
  margin-top: 3px;
`;

const RightNavButtons = ({ history }) => {
  const { user, auth } = useAuth();
  const { alertUser } = useMainContext();
  const [activeIndex, setActiveIndex] = useState(null);
  const unreadNotification = user.notifications.filter(
    (notification) => !notification.read
  );
  const hasUnreadNotification = unreadNotification.length > 0;
  const hasNotifications = user.notifications.length > 0;

  const handleClick = async (notification, index) => {
    setActiveIndex(index === activeIndex ? null : index);
    if (!notification.read) {
      user.notifications.splice(index, 1, { ...notification, read: true });
      await requestUserUpdate({ notifications: user.notifications })
        .then((res) => {
          auth.authListener(res.data);
        })
        .catch((error) => alertUser(error.response.data.error));
    }
  };

  return (
    <StyledDiv>
      <DropdownButton
        icon="bell"
        labeled={false}
        color=""
        header="Notifications"
        closeOnSelect={true}
        notificationCount={hasUnreadNotification && unreadNotification.length}
        iconColor={hasUnreadNotification ? "red" : "grey"}
      >
        <UIWrapper className="notifications">
          {hasNotifications ? (
            user.notifications.map((notification, index) => {
              return (
                <Accordion key={index}>
                  <Accordion.Title
                    active={activeIndex === index}
                    index={0}
                    onClick={() => handleClick(notification, index)}
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
      <NavUserAvatar userName={user.fname} history={history} fontSize="13px" />
    </StyledDiv>
  );
};

export default RightNavButtons;
