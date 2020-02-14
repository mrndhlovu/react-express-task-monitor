import React, { useContext } from "react";
import styled from "styled-components";

import LeftNavButtons from "./LeftNavButtons";
import Logo from "./Logo";
import { AppContext } from "../../utils/contextUtils";
import RightNavButtons from "./RightNavButtons";
import { DEFAULT_NAV_COLOR } from "../../constants/constants";

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0 4px 5px;
  background-color: ${props => props.color};
`;

const NavHeader = () => {
  const { color } = useContext(AppContext);
  return (
    <NavWrapper color={color === DEFAULT_NAV_COLOR ? color : "transparent"}>
      <LeftNavButtons />
      <Logo />
      <RightNavButtons />
    </NavWrapper>
  );
};

export default NavHeader;
