import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Icon } from "semantic-ui-react";
import { AUTH_EP } from "../../utils/urls";

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

const SocialAuthButton = ({ buttonText, color, provider }) => {
  const handleButtonClick = () => (window.location = `${AUTH_EP}/${provider}`);

  return (
    <StyledSegment onClick={handleButtonClick} type="button">
      <Icon name={provider} color={color} />
      {buttonText}
    </StyledSegment>
  );
};

SocialAuthButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  color: PropTypes.string,
  provider: PropTypes.string.isRequired,
};

export default SocialAuthButton;
