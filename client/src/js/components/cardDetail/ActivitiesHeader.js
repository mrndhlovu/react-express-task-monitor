import React from "react";
import styled from "styled-components";

import { Button } from "semantic-ui-react";
import CardDetailHeader from "../sharedComponents/CardDetailHeader";

const Container = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 50% 50%;
`;

const ActivitiesHeader = ({ handleShowDetails }) => {
  return (
    <Container>
      <div>
        <CardDetailHeader description="Activities" icon="sort amount down" />
      </div>
      <div>
        <Button
          onClick={handleShowDetails}
          floated="right"
          size="tiny"
          content="Show Details"
        />
      </div>
    </Container>
  );
};

export default ActivitiesHeader;
