import React from "react";
import PropTypes from "prop-types";

import { Button } from "semantic-ui-react";

import CardDetailHeader from "../sharedComponents/CardDetailHeader";
import UIWrapper from "../sharedComponents/UIWrapper";

const ActivitiesHeader = ({ handleShowDetails, hideButton }) => {
  return (
    <UIWrapper className="activities-wrap">
      <CardDetailHeader description="Activities" />
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

ActivitiesHeader.propTypes = {
  handleShowDetails: PropTypes.func.isRequired,
  hideButton: PropTypes.bool,
};

export default ActivitiesHeader;
