import React from "react";
import styled from "styled-components";

import { Button } from "semantic-ui-react";
import CardDetailHeader from "../sharedComponents/CardDetailHeader";

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ActivitiesHeader = ({ handleShowDetails, hideButton }) => {
  return (
    <Container>
      <CardDetailHeader description="Activities" icon="sort amount down" />

      {!hideButton && (
        <Button
          onClick={handleShowDetails}
          floated="right"
          size="tiny"
          content="Show Details"
          compact
        />
      )}
    </Container>
  );
};

export default ActivitiesHeader;
