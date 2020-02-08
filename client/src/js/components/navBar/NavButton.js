import React, { useContext } from "react";
import styled from "styled-components";

import { Button } from "semantic-ui-react";
import { DimensionContext } from "../../utils/contextUtils";

const StyledButton = styled(Button)`
  background-color: #ffffff3d !important;
`;

const NavButton = ({ redirect, buttonText, iconName }) => {
  const { mobile } = useContext(DimensionContext).device;
  return mobile ? (
    <StyledButton size="tiny" onClick={redirect} icon={iconName} />
  ) : (
    <StyledButton
      size="tiny"
      onClick={redirect}
      icon={iconName}
      content={!mobile && buttonText}
    />
  );
};

export default NavButton;
