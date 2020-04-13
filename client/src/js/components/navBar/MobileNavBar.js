import React from "react";
import styled from "styled-components";

import { Button } from "semantic-ui-react";
import UIWrapper from "../sharedComponents/UIWrapper";

const StyledButton = styled(Button)`
  background: transparent !important;
  padding: 3px 10px !important;
`;
const display = {
  width: "100%",
  justifyContent: "space-between",
};

const MobileNavBar = ({
  setVisible,
  isHomePage,
  history,
  setShowMobileMenu,
}) => {
  return (
    <UIWrapper display={display} padding="7px 10">
      <StyledButton
        onClick={() => (isHomePage ? setVisible() : history.push("/"))}
        icon={isHomePage ? "bars" : "arrow left"}
      />

      {!isHomePage && (
        <StyledButton
          floated="right"
          size="tiny"
          icon="ellipsis horizontal"
          onClick={() => setShowMobileMenu()}
        />
      )}
    </UIWrapper>
  );
};

export default MobileNavBar;
