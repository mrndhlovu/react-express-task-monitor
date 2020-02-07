import React from "react";

import { Card, Icon } from "semantic-ui-react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const StyledCard = styled.div`
  min-height: 50px;
`;

const Wrapper = styled.div`
  padding-right: 10px;
  padding-bottom: 10px;
`;

const Summary = ({ header, id, history }) => (
  <Wrapper>
    <Card color="grey" onClick={() => history.push(`/boards/id/${id}`)}>
      <Card.Content>
        <Card.Header content={header} />
        <StyledCard />
        <Icon name="star" />
      </Card.Content>
    </Card>
  </Wrapper>
);

export default withRouter(Summary);
