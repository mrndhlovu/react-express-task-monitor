import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import LeftNavButtons from "./LeftNavButtons";
import Logo from "./Logo";
import RightNavButtons from "./RightNavButtons";

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0 4px 5px;
  background-color: ${props => props.color};
`;

const NavHeader = ({ history, color }) => {
  return (
    <NavWrapper color={color}>
      <LeftNavButtons history={history} />
      <Logo />
      <RightNavButtons />
    </NavWrapper>
  );
};

export default withRouter(NavHeader);
