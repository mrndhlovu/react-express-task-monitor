import React from "react";

import { Segment, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledContainer = styled.div`
  justify-self: center;

  padding-right: 10px;
  width: 100%;
`;

const HomeSideBar = () => {
  return (
    <StyledContainer>
      <Segment>
        <Button as={Link} to="/" fluid content="Boards" />
      </Segment>
    </StyledContainer>
  );
};

export default HomeSideBar;
