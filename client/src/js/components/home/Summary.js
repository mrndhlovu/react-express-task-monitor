import React from "react";

import { Card, Icon } from "semantic-ui-react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const StyledCard = styled.div`
  min-height: 50px;
`;

const HeaderWrapper = styled.div`
  cursor: pointer;
`;

const StarWrapper = styled.div`
  display: grid;
  justify-items: end;
  margin: 0 5px 5px 0;
`;

const Wrapper = styled.div`
  padding-right: 10px;
  padding-bottom: 10px;
`;

const Summary = ({ header, id, history, handleBoardStarClick, starred }) => (
  <Wrapper>
    <Card color="grey">
      <Card.Content>
        <HeaderWrapper onClick={() => history.push(`/boards/id/${id}`)}>
          <Card.Header content={header} />
          <StyledCard />
        </HeaderWrapper>
        <StarWrapper>
          <Icon
            name="star outline"
            onClick={() => handleBoardStarClick(id)}
            color={starred ? "yellow" : "grey"}
          />
        </StarWrapper>
      </Card.Content>
    </Card>
  </Wrapper>
);

export default withRouter(Summary);
