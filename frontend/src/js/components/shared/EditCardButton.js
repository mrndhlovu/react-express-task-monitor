import React from "react";
import PropTypes from "prop-types";

import DropdownButton from "./DropdownButton";
import UIContainer from "./UIContainer";

const EditCardButton = ({
  handleClick,
  icon,
  children,
  closeOnSelect,
  buttonText,
  close,
}) => {
  return (
    <DropdownButton
      close={close}
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

EditCardButton.propTypes = {
  handleClick: PropTypes.func,
  icon: PropTypes.string,
  children: PropTypes.element.isRequired,
  closeOnSelect: PropTypes.bool,
  buttonText: PropTypes.string.isRequired,
  close: PropTypes.bool,
};

export default EditCardButton;
