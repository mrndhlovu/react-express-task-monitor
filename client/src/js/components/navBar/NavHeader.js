import React, { useContext, memo } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { AppContext } from "../../utils/contextUtils";
import LeftNavButtons from "./LeftNavButtons";
import Logo from "./Logo";
import RightNavButtons from "./RightNavButtons";

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 3px 0;
  background-color: ${props => props.color};
  max-height: 40px;
  position: fixed;
  z-index: 100;
  width: 100%;
`;

const NavHeader = ({ history, color }) => {
  const { device } = useContext(AppContext);

  return (
    <NavWrapper color={color}>
      <LeftNavButtons />
      <Logo history={history} mobile={device.mobile} />
      <RightNavButtons history={history} />
    </NavWrapper>
  );
};

export default withRouter(memo(NavHeader));
