import React from "react";
import { Button } from "semantic-ui-react";

const NavButton = ({ redirect, buttonText, iconName }) => {
  return (
    <Button
      size="tiny"
      onClick={redirect}
      icon={iconName}
      content={buttonText}
    />
  );
};

export default NavButton;
