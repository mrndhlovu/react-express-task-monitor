import React, { useContext } from "react";
import styled from "styled-components";

import LeftNavButtons from "./LeftNavButtons";
import Logo from "./Logo";
import { AppContext } from "../../utils/contextUtils";
import RightNavButtons from "./RightNavButtons";

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0 4px 5px;
  background-color: ${props => props.color};
`;

const NavHeader = () => (
  <NavWrapper color={useContext(AppContext).color}>
    <LeftNavButtons />
    <Logo />
    <RightNavButtons />
  </NavWrapper>
);

export default NavHeader;
