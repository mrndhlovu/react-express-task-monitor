import React from "react";
import styled from "styled-components";

import { Button } from "semantic-ui-react";

import { useMainContext } from "../../utils/hookUtils";
import NavButtonIcon from "./NavButtonIcon";

const StyledButton = styled(Button)`
  background-color: #ffffff3d !important;
  border-radius: 1px !important;
  color: white !important;
`;

const NavButton = ({
  buttonColor,
  buttonText,
  forceText,
  iconName,
  id,
  redirect,
  float,
  className,
  compact = true,
}) => {
  const { mobile } = useMainContext().device;

  return mobile && !forceText ? (
    <StyledButton
      className={className}
      compact={compact}
      onClick={redirect}
      float={float}
      icon={
        iconName && (
          <NavButtonIcon iconName={iconName} iconColor={buttonColor} />
        )
      }
      color={buttonColor}
    />
  ) : (
    <StyledButton
      id={id}
      className={`${className} ui`}
      onClick={redirect}
      content={buttonText}
      float={float}
      compact={compact}
      icon={
        iconName && (
          <NavButtonIcon iconName={iconName} iconColor={buttonColor} />
        )
      }
      color={buttonColor}
    />
  );
};

export default NavButton;
