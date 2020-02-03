import React from "react";

import { Button } from "semantic-ui-react";
import styled from "styled-components";

const StyledButton = styled(Button)`
  background-color: #ffffff3d !important;
`;

const NavButton = ({ redirect, buttonText, iconName }) => {
  return (
    <StyledButton
      size="tiny"
      onClick={redirect}
      icon={iconName}
      content={buttonText}
    />
  );
};

export default NavButton;
