import React from "react";

import CardDetailSegment from "../sharedComponents/CardDetailSegment";
import ActivitiesHeader from "./ActivitiesHeader";

const CardActivities = ({ hideActivities, ...props }) => {
  return (
    <CardDetailSegment>
      <ActivitiesHeader {...props} />
      {!hideActivities && "ModalActivities"}
    </CardDetailSegment>
  );
};

export default CardActivities;
