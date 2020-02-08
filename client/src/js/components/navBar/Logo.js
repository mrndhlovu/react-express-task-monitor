import React from "react";
import styled from "styled-components";

import { Header } from "semantic-ui-react";

const StyledDiv = styled.div`
  display: grid;
  align-self: center;
`;

const Logo = () => (
  <StyledDiv>
    <Header size="small" content="Mo-Neat" />
  </StyledDiv>
);

export default Logo;
