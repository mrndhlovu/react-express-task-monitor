import React from "react";
import styled from "styled-components";

import { Segment, Button } from "semantic-ui-react";

const StyledContainer = styled.div`
  justify-self: center;

  padding-right: 10px;
  width: 100%;
`;

const HomeSideBar = () => {
  return (
    <StyledContainer>
      <Segment>
        <Button fluid content="Boards" />
      </Segment>
    </StyledContainer>
  );
};

export default HomeSideBar;
