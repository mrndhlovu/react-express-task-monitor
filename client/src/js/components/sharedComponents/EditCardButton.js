import React from "react";

import DropdownButton from "./DropdownButton";
import UIContainer from "./UIContainer";

const EditCardButton = ({
  handleClick,
  icon,
  children,
  closeOnSelect,
  buttonText,
}) => {
  return (
    <DropdownButton
      buttonText={buttonText}
      icon={icon}
      compact
      onClick={handleClick}
      color="#bababc"
      hasHeader={true}
      closeOnSelect={closeOnSelect}
      header={buttonText}
    >
      <UIContainer>{children}</UIContainer>
    </DropdownButton>
  );
};

export default EditCardButton;
