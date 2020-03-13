import React, { useContext, memo } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { AppContext } from "../../utils/contextUtils";
import { DEFAULT_NAV_COLOR } from "../../constants/constants";
import LeftNavButtons from "./LeftNavButtons";
import Logo from "./Logo";
import RightNavButtons from "./RightNavButtons";

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3px 0;
  background-color: ${props => props.color};
  max-height: 40px;
`;

const NavHeader = ({ history }) => {
  const { color, device } = useContext(AppContext);

  return (
    <NavWrapper color={color === DEFAULT_NAV_COLOR ? color : "transparent"}>
      <LeftNavButtons />
      <Logo history={history} mobile={device.mobile} />
      <RightNavButtons history={history} />
    </NavWrapper>
  );
};

export default withRouter(memo(NavHeader));
