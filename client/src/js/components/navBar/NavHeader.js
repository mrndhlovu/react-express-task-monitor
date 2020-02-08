import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import LeftNavButtons from "./LeftNavButtons";
import Logo from "./Logo";
import RightNavButtons from "./RightNavButtons";

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  min-height: 40px;
  padding: 5px 0 4px 5px;
  background: rgba(0, 0, 0, 0.15);
`;

const NavHeader = ({ history }) => {
  return (
    <NavWrapper>
      <LeftNavButtons history={history} />
      <Logo />
      <RightNavButtons />
    </NavWrapper>
  );
};

export default withRouter(NavHeader);
