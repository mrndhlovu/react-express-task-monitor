import React from "react";
import styled from "styled-components";

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

export default UIButton;
