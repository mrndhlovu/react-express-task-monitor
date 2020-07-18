import React, { memo } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import LeftNavButtons from "./LeftNavButtons";
import Logo from "./Logo";
import MobileNavBar from "./MobileNavBar";
import RightNavButtons from "./RightNavButtons";
import { useMainContext } from "../../utils/hookUtils";

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 100%;
`;

const NavContainer = styled.nav`
  background-color: ${(props) => props.color};
  max-height: 40px;
  min-height: 40px;
  position: sticky;
  padding-top: 2px;
  z-index: 100;
`;

const NavHeader = ({ history, color, setVisible }) => {
  const { isHomePage, setShowMobileMenu } = useMainContext();
  return (
    <NavContainer className="nav-container" color={color}>
      <NavWrapper className="desktop-nav-container">
        <LeftNavButtons history={history} />
        <Logo history={history} />
        <RightNavButtons history={history} />
      </NavWrapper>

      <MobileNavBar
        setVisible={setVisible}
        isHomePage={isHomePage}
        history={history}
        setShowMobileMenu={setShowMobileMenu}
      />
    </NavContainer>
  );
};

NavHeader.defaultProps = { color: "transparent" };

NavHeader.propTypes = {
  setVisible: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default withRouter(memo(NavHeader));
