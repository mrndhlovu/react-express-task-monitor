import React from "react";

import CardDetailSegment from "../sharedComponents/CardDetailSegment";
import ActivitiesHeader from "./ActivitiesHeader";
import Activities from "./Activities";
import CardComments from "./CardComments";

const CardActivities = ({ hideActivities, ...props }) => {
  return (
    <CardDetailSegment>
      <ActivitiesHeader {...props} />
      <CardComments />
      {!hideActivities && <Activities {...props} />}
    </CardDetailSegment>
  );
};

export default CardActivities;
