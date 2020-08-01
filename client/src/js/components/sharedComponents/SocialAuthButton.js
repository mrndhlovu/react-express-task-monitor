import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Icon } from "semantic-ui-react";

const StyledSegment = styled.button`
  border: 1px solid #e4e4e4;
  box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 5px 0px;
  cursor: pointer;
  margin-bottom: 10px;
  min-height: 30px;
  padding: 10px;
  text-align: center;
  width: 100%;
`;

const SocialAuthButton = ({
  buttonText,
  color,
  handleButtonClick,
  icon,
  size,
}) => {
  return (
    <StyledSegment onClick={handleButtonClick} type="button">
      <Icon name={icon} color={color} size={size} />
      {buttonText}
    </StyledSegment>
  );
};

SocialAuthButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  color: PropTypes.string,
  icon: PropTypes.string.isRequired,
  size: PropTypes.string,
  handleButtonClick: PropTypes.func.isRequired,
};

export default SocialAuthButton;
