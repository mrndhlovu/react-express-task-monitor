import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Button } from "semantic-ui-react";

const StyledButton = styled(Button)`
  background-color: #ffffff3d !important;
`;

const UIButton = ({ content, compact = true, fluid = false, onClick }) => {
  return (
    <StyledButton
      compact={compact}
      className="uibutton"
      content={content}
      fluid={fluid}
      onClick={onClick}
    />
  );
};

UIButton.propTypes = {
  content: PropTypes.string.isRequired,
  compact: PropTypes.bool,
  fluid: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default UIButton;
