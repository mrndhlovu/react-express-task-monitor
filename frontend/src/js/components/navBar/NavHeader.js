import React, { memo } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { DEFAULT_NAV_COLOR } from "../../constants/constants";
import { useMainContext } from "../../utils/hookUtils";
import LeftNavButtons from "./LeftNavButtons";
import Logo from "./Logo";
import RightNavButtons from "./RightNavButtons";

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const NavContainer = styled.nav`
  background-color: ${({ bgColor }) => bgColor};
  z-index: 100;
  display: flex;
  justify-content: space-between;
`;

const NavHeader = ({ history, authenticated }) => {
  const { activeBoard } = useMainContext();

  const BG_COLOR =
    !activeBoard?.styleProperties?.color && !activeBoard?.styleProperties?.image
      ? DEFAULT_NAV_COLOR
      : activeBoard.styleProperties?.image
      ? "transparent"
      : activeBoard.styleProperties?.color;

  return authenticated ? (
    <NavContainer className="nav-container" bgColor={BG_COLOR}>
      <NavWrapper>
        <LeftNavButtons history={history} />
        <Logo history={history} />
        <RightNavButtons history={history} />
      </NavWrapper>
    </NavContainer>
  ) : null;
};

NavHeader.defaultProps = {
  authenticated: false,
};

NavHeader.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  authenticated: PropTypes.bool,
};

export default withRouter(memo(NavHeader));
