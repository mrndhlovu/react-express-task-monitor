import React, { useContext } from "react";
import styled from "styled-components";

import { Button } from "semantic-ui-react";
import { MainContext } from "../../utils/contextUtils";
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
}) => {
  const { mobile } = useContext(MainContext).device;

  return mobile && !forceText ? (
    <StyledButton
      size="tiny"
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
      className="ui"
      size="tiny"
      onClick={redirect}
      content={buttonText}
      float={float}
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
