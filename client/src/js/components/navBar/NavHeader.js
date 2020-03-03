import React, { useContext } from "react";
import styled from "styled-components";

import LeftNavButtons from "./LeftNavButtons";
import Logo from "./Logo";
import { AppContext } from "../../utils/contextUtils";
import RightNavButtons from "./RightNavButtons";
import { DEFAULT_NAV_COLOR } from "../../constants/constants";
import { withRouter } from "react-router-dom";

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3px 0;
  background-color: ${props => props.color};
  max-height: 40px;
`;

const NavHeader = ({ history }) => {
  const { color } = useContext(AppContext);
  return (
    <NavWrapper color={color === DEFAULT_NAV_COLOR ? color : "transparent"}>
      <LeftNavButtons />
      <Logo history={history} />
      <RightNavButtons />
    </NavWrapper>
  );
};

export default withRouter(NavHeader);
