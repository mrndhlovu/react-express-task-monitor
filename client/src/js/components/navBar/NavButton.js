import React, { useContext } from "react";
import styled from "styled-components";

import { Button, Icon } from "semantic-ui-react";
import { DimensionContext } from "../../utils/contextUtils";

const StyledButton = styled(Button)`
  background-color: #ffffff3d !important;
`;

const NavButton = ({
  redirect,
  buttonText,
  iconName,
  forceText,
  color,
  buttonColor
}) => {
  const { mobile } = useContext(DimensionContext).device;

  return mobile && !forceText ? (
    <StyledButton
      size="tiny"
      onClick={redirect}
      icon={iconName && <Icon name={iconName} color={color} />}
      color={buttonColor}
    />
  ) : (
    <StyledButton
      size="tiny"
      onClick={redirect}
      content={buttonText}
      icon={iconName && <Icon name={iconName} color={color} />}
      color={buttonColor}
    />
  );
};

export default NavButton;
