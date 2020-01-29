import React from "react";
import styled from "styled-components";

import { Header } from "semantic-ui-react";

const StyledDiv = styled.div`
  display: inline-block;
  align-self: center;
  justify-self: center;
`;

const color = "light-blue";

const Logo = () => (
  <StyledDiv>
    <Header color={color} size="small" icon="columns" content="Trello Clone" />
  </StyledDiv>
);

export default Logo;
