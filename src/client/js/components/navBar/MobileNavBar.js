import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Button, Icon } from "semantic-ui-react";
import UIWrapper from "../sharedComponents/UIWrapper";
import Logo from "./Logo";

const StyledButton = styled(Button)`
  background: transparent !important;
  padding: 3px 10px !important;
`;

const MobileNavBar = ({
  setVisible,
  isHomePage,
  history,
  setShowMobileMenu,
}) => {
  return (
    <UIWrapper className="mobile-navbar">
      <StyledButton
        onClick={() => (isHomePage ? setVisible() : history.push("/"))}
        icon={
          <Icon
            name={isHomePage ? "bars" : "arrow left"}
            className="nav-menu-icon"
            size="large"
          />
        }
      />

      <Logo history={history} />

      {!isHomePage && (
        <StyledButton
          floated="right"
          size="tiny"
          icon={
            <Icon
              className="nav-menu-icon"
              name="ellipsis vertical"
              size="large"
            />
          }
          onClick={setShowMobileMenu}
        />
      )}
    </UIWrapper>
  );
};

MobileNavBar.propTypes = {
  isHomePage: PropTypes.bool.isRequired,
  setShowMobileMenu: PropTypes.func.isRequired,
  setVisible: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default MobileNavBar;
