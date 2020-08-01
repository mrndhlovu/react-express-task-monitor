import React, { memo } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import LeftNavButtons from "./LeftNavButtons";
import Logo from "./Logo";
import RightNavButtons from "./RightNavButtons";

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const NavContainer = styled.nav`
  background-color: ${(props) => props.color};
  z-index: 100;
  display: flex;
  justify-content: space-between;
`;

const NavHeader = ({ history, color }) => {
  return (
    <NavContainer className="nav-container" color={color}>
      <NavWrapper>
        <LeftNavButtons history={history} />
        <Logo history={history} />
        <RightNavButtons history={history} />
      </NavWrapper>
    </NavContainer>
  );
};

NavHeader.defaultProps = { color: "transparent" };

NavHeader.propTypes = {
  color: PropTypes.string.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default withRouter(memo(NavHeader));
