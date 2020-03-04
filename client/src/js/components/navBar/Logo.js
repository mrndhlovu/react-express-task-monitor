import React from "react";
import styled from "styled-components";

import { Icon } from "semantic-ui-react";

const StyledDiv = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  padding-top: 9px;
  cursor: pointer;
`;

const Span = styled.span`
  font-size: ${props => (props.mobile ? "15px" : "21px")};
  font-family: "Dancing Script", cursive;
  font-weight: 600;
  transition-delay: 300ms;
  transition-timing-function: ease-in-out;
  transition-property: font;

  &:hover {
    font-weight: 500;
  }

  &:after {
    content: "Trello Clone";
  }
`;

const Logo = ({ history, mobile }) => (
  <StyledDiv onClick={() => history.push("/")}>
    <Span mobile={mobile}>{!mobile && <Icon name="trello" />}</Span>
  </StyledDiv>
);

export default Logo;
