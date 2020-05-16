import React from "react";
import styled from "styled-components";

import { Icon } from "semantic-ui-react";

const StyledDiv = styled.div`
  cursor: pointer;
  flex: 1;
  max-width: ${(props) => (props.mobile ? "40%" : "62%")};
  padding-top: 3px;
  text-align: center;
`;

const Header = styled.h2`
  color: white;
  font-size: ${(props) => (props.mobile ? "18px" : "22px")};

  &:after {
    content: "Task Monitor";
    font-size: ${(props) => (props.mobile ? "18px" : "22px")};
    font-family: "Shadows Into Light Two", cursive;
  }
  &:hover {
    color: #ffffff3d;
    transition-delay: 100ms;
  }
`;

const Logo = ({ history, mobile }) => (
  <StyledDiv mobile={mobile}>
    <Header mobile={mobile} onClick={() => history.push("/")}>
      <Icon name="bullseye" />
    </Header>
  </StyledDiv>
);

export default Logo;
