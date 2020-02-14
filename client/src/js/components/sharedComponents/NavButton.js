import React, { useContext } from "react";
import styled from "styled-components";

import { Button, Icon } from "semantic-ui-react";
import { AppContext } from "../../utils/contextUtils";

const StyledButton = styled(Button)`
  background-color: #ffffff3d !important;
`;

const NavButton = ({
  buttonColor,
  buttonText,
  color,
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
      icon={
        iconName && <Icon name={iconName} color={color ? color : "black"} />
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
      icon={
        iconName && <Icon name={iconName} color={color ? color : "black"} />
      }
      color={buttonColor}
    />
  );
};

export default NavButton;
