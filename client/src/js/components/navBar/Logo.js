import React from "react";
import styled from "styled-components";

import { Header } from "semantic-ui-react";

const StyledDiv = styled.div`
  display: inline-block;
  align-self: center;
  justify-self: center;
`;

const Logo = () => (
  <StyledDiv>
    <Header size="small" icon="columns" content="Trello Clone" />
  </StyledDiv>
);

export default Logo;
