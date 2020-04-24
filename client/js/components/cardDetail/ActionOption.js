import React from "react";
import styled from "styled-components";

import { Button } from "semantic-ui-react";

const StyledButton = styled(Button)`
  background-color: #ffffff3d !important;
`;

const ActionOption = () => {
  return (
    <div>
      <StyledButton />
    </div>
  );
};

export default ActionOption;
