import React from "react";
import moment from "moment";
import CardDetailSegment from "../sharedComponents/CardDetailSegment";
import UserAvatar from "../sharedComponents/UserAvatar";
import { getUserInitials } from "../../utils/appUtils";
import styled from "styled-components";

const StyledActivitiesContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 10px;
`;

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
  const activities = board.activities.sort((a, b) => b.createdAt - a.createdAt);

  return (
    <CardDetailSegment>
      {activities.map(activity => {
        const time = moment(activity.createdAt).format("LLL");

        return (
          <StyledActivitiesContainer key={activity.createdAt}>
            <UserAvatar userInitials={getUserInitials(user)} />
            <Detail>
              {activity.activity} <br />
              <StyledSpan>{time}</StyledSpan>
            </Detail>
          </StyledActivitiesContainer>
        );
      })}
    </CardDetailSegment>
  );
};

export default Activities;
