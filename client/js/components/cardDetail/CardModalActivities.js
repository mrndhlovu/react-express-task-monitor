import React, { lazy, Suspense } from "react";

const CardComments = lazy(() => import("./CardComments"));
const CardDetailSegment = lazy(() =>
  import("../sharedComponents/CardDetailSegment")
);
const ActivitiesHeader = lazy(() => import("./ActivitiesHeader"));
const Activities = lazy(() => import("./Activities"));

const CardModalActivities = ({ hideActivities, ...props }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CardDetailSegment>
        <ActivitiesHeader {...props} />
        <CardComments {...props} />
        {!hideActivities && <Activities {...props} />}
      </CardDetailSegment>
    </Suspense>
  );
};

export default CardModalActivities;
