import React from "react";

import { Button } from "semantic-ui-react";
import CardDetailHeader from "../sharedComponents/CardDetailHeader";
import UIWrapper from "../sharedComponents/UIWrapper";

const ActivitiesHeader = ({ handleShowDetails, hideButton }) => {
  return (
    <UIWrapper className="activities-wrap">
      <CardDetailHeader description="Activities" icon="sort amount down" />

      {!hideButton && (
        <Button
          onClick={handleShowDetails}
          floated="right"
          size="tiny"
          content="Show Details"
        />
      )}
    </UIWrapper>
  );
};

export default ActivitiesHeader;
