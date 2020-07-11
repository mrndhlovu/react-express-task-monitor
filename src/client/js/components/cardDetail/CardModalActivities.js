import React, { lazy, Suspense } from "react";

import { useCardDetailContext } from "../../utils/hookUtils";
import UIContainer from "../sharedComponents/UIContainer";

const CardComments = lazy(() => import("./CardComments"));
const CardDetailSegment = lazy(() =>
  import("../sharedComponents/CardDetailSegment")
);
const ActivitiesHeader = lazy(() => import("./ActivitiesHeader"));
const Activities = lazy(() => import("./Activities"));

const CardModalActivities = ({ ...props }) => {
  const { setHideActivities, hideActivities } = useCardDetailContext();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ActivitiesHeader
        handleShowDetails={() => setHideActivities(!hideActivities)}
      />
      <CardDetailSegment>
        <UIContainer>
          <CardComments />
          {!hideActivities && <Activities {...props} />}
        </UIContainer>
      </CardDetailSegment>
    </Suspense>
  );
};

export default CardModalActivities;
