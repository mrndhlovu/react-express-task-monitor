import React, { useContext } from "react";
import styled from "styled-components";

import { Button } from "semantic-ui-react";
import { AppContext } from "../../utils/contextUtils";
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
  redirect
}) => {
  const { mobile } = useContext(AppContext).device;

  return mobile && !forceText ? (
    <StyledButton
      size="tiny"
      onClick={redirect}
      icon={iconName && <NavButtonIcon iconName={iconName} />}
      color={buttonColor}
    />
  ) : (
    <StyledButton
      id={id}
      className="ui"
      size="tiny"
      onClick={redirect}
      content={buttonText}
      icon={iconName && <NavButtonIcon iconName={iconName} />}
      color={buttonColor}
    />
  );
};

export default NavButton;
