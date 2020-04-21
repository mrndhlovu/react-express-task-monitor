import React from "react";
import styled from "styled-components";

import { Icon } from "semantic-ui-react";

const StyledDiv = styled.div`
  cursor: pointer;
  flex: 1;
  max-width: 62%;
  padding-top: 3px;
  text-align: center;
`;

const Header = styled.h2`
  color: white;
  font-size: ${(props) => (props.mobile ? "18px" : "22px")};

  &:after {
    content: "Trello Clone";
    font-size: ${(props) => (props.mobile ? "18px" : "22px")};
    font-family: "Shadows Into Light Two", cursive;
  }
  &:hover {
    color: #5098c2;
    transition-delay: 100ms;
    transition-property: color;
    transition-timing-function: ease-in-out;
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
