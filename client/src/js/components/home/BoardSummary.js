import React from "react";

import { Card, Icon } from "semantic-ui-react";
import styled from "styled-components";

const StyledCard = styled.div`
  min-height: 50px;
`;

const BoardSummary = ({ header, id, history }) => {
  return (
    <Card color="grey" onClick={() => history.push(`/board/${id}`)}>
      <Card.Content>
        <Card.Header content={header} />
        <StyledCard />
        <Icon name="star" />
      </Card.Content>
    </Card>
  );
};

export default BoardSummary;
