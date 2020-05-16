import React from "react";

import { Button } from "semantic-ui-react";
import CardDetailHeader from "../sharedComponents/CardDetailHeader";
import UIContainer from "../sharedComponents/UIContainer";

const display = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 0 10px 0",
};

const ActivitiesHeader = ({ handleShowDetails, hideButton }) => {
  return (
    <UIContainer display={display}>
      <CardDetailHeader description="Activities" icon="sort amount down" />

      {!hideButton && (
        <Button
          onClick={handleShowDetails}
          floated="right"
          size="tiny"
          content="Show Details"
        />
      )}
    </UIContainer>
  );
};

export default ActivitiesHeader;
