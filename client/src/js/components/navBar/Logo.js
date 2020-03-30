import React from "react";
import styled from "styled-components";

import { Icon } from "semantic-ui-react";

const StyledDiv = styled.div`
  padding-top: 3px;
  cursor: pointer;
  flex: 1;
  text-align: center;
`;

const Header = styled.h1`
  font-size: ${props => (props.mobile ? "18px" : "22px")};
  font-family: "Dancing Script", cursive;
  font-weight: 600;
  color: white;

  &:after {
    content: "Trello Clone";
    font-size: ${props => (props.mobile ? "18px" : "22px")};
  }
  &:hover {
    color: #5098c2;
    transition-delay: 100ms;
    transition-timing-function: ease-in-out;
    transition-property: color;
  }
`;

const Logo = ({ history, mobile }) =>
  !mobile && (
    <StyledDiv>
      <Header mobile={mobile} onClick={() => history.push("/")}>
        <Icon name="trello" />
      </Header>
    </StyledDiv>
  );

export default Logo;
