import React, { lazy, Suspense } from "react";

import { useCardDetailContext } from "../../utils/hookUtils";
import UIContainer from "../shared/UIContainer";

const CardComments = lazy(() => import("./CardComments"));
const CardDetailSegment = lazy(() => import("../shared/CardDetailSegment"));
const ActivitiesHeader = lazy(() => import("./ActivitiesHeader"));
const Activities = lazy(() => import("./Activities"));

const CardModalActivities = () => {
  const { setHideActivities, hideActivities } = useCardDetailContext();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ActivitiesHeader
        handleShowDetails={() => setHideActivities(!hideActivities)}
        hideActivities={hideActivities}
      />
      <CardDetailSegment>
        <UIContainer>
          <CardComments />
          {!hideActivities && <Activities />}
        </UIContainer>
      </CardDetailSegment>
    </Suspense>
  );
};

export default CardModalActivities;
