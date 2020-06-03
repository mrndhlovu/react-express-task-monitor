import React, { useState } from "react";
import styled from "styled-components";

import { Accordion, Icon } from "semantic-ui-react";
import { requestUserUpdate } from "../../apis/apiRequests";
import { useAuth } from "../../utils/hookUtils";
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
  const { notifications, fname } = useAuth().user;
  const [activeIndex, setActiveIndex] = useState(null);
  const unreadNotification = notifications.filter(
    (notification) => !notification.read
  );
  const hasUnreadNotification = unreadNotification.length > 0;

  const handleClick = (notification, index) => {
    setActiveIndex(index === activeIndex ? null : index);
    if (!notification.read) {
      notifications.splice(index, 1, { ...notification, read: true });
      requestUserUpdate({ notifications });
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
          {notifications.map((notification, index) => {
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
          })}
        </UIWrapper>
      </DropdownButton>
      <NavUserAvatar userName={fname} history={history} fontSize="13px" />
    </StyledDiv>
  );
};

export default RightNavButtons;
