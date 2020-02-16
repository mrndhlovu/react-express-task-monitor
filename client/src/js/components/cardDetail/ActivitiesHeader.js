import React from "react";
import styled from "styled-components";

import { Header, Icon, Button } from "semantic-ui-react";

const Container = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 50% 50%;
`;

const StyledHeader = styled(Header)`
  font-size: 16px !important;
`;

const IconWrapper = styled.i`
  font-size: 19px;
`;

const Span = styled.span`
  letter-spacing: 1px;
`;

const ActivitiesHeader = ({ handleShowDetails }) => {
  return (
    <Container>
      <div>
        <StyledHeader
          content={<Span>Activity</Span>}
          icon={
            <IconWrapper>
              <Icon name="sort amount down" />
            </IconWrapper>
          }
        />
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
