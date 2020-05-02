import React from "react";
import styled from "styled-components";

import { getUserInitials, getFormattedDate } from "../../utils/appUtils";
import CardDetailSegment from "../sharedComponents/CardDetailSegment";
import UserAvatar from "../sharedComponents/UserAvatar";
import UIContainer from "../sharedComponents/UIContainer";

const display = {
  display: "flex",
  justifyContent: "flex-start",
};

const StyledSpan = styled.span`
  font-size: 11px;
  line-height: 20px;
  font-weight: 400;
  color: #172b4d;
`;

const Detail = styled.span`
  font-size: 11px;
  font-weight: 400;
  margin-left: 20px;
`;

const Activities = ({ board, user }) => {
  return (
    <CardDetailSegment>
      {board.activities.map((activity) => {
        const time = getFormattedDate(activity.createdAt, "LLL");

        return (
          <UIContainer display={display} key={activity.createdAt}>
            <UserAvatar
              padding="18px !important"
              userInitials={getUserInitials(user)}
            />
            <Detail>
              {activity.activity} <br />
              <StyledSpan>{time}</StyledSpan>
            </Detail>
          </UIContainer>
        );
      })}
    </CardDetailSegment>
  );
};

export default Activities;
