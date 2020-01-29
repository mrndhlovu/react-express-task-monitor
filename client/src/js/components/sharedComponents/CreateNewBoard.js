import React from "react";
import styled from "styled-components";

import { Card } from "semantic-ui-react";

const StyledCard = styled.div`
  min-height: 50px;
`;

const CreateNewBoard = ({ showNewBoardModal }) => {
  return (
    <Card color="grey" onClick={() => showNewBoardModal()}>
      <Card.Content>
        <StyledCard>
          <Card.Header content="Create new board" />
        </StyledCard>
      </Card.Content>
    </Card>
  );
};

export default CreateNewBoard;
