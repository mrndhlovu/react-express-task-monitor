import React, { useContext, memo } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { MainContext } from "../../utils/contextUtils";
import LeftNavButtons from "./LeftNavButtons";
import Logo from "./Logo";
import MobileNavBar from "./MobileNavBar";
import RightNavButtons from "./RightNavButtons";

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 3px 0;
  background-color: ${(props) => props.color};
  max-height: 40px;
  min-height: 40px;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
`;

const NavHeader = ({ history, color = "transparent", setVisible }) => {
  const { device, isHomePage, setShowMobileMenu } = useContext(MainContext);

  return (
    <NavWrapper color={color}>
      {!device.mobile ? (
        <>
          <LeftNavButtons />
          <Logo history={history} mobile={device.mobile} />
          <RightNavButtons history={history} />
        </>
      ) : (
        <MobileNavBar
          setVisible={setVisible}
          isHomePage={isHomePage}
          history={history}
          setShowMobileMenu={setShowMobileMenu}
        />
      )}
    </NavWrapper>
  );
};

export default withRouter(memo(NavHeader));
