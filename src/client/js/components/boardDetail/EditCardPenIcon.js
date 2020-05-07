import React from "react";
import styled from "styled-components";

import { Button } from "semantic-ui-react";

const EditIconWrapper = styled.div`
  font-size: 13px;
  position: absolute;
  margin-right: 5px;
  margin-top: 3px;
  right: 0;
  top: 4px;
`;

const StyledButton = styled(Button)`
  padding: 7px !important;
  border-radius: 2px !important;
`;

const EditCardPenIcon = ({ setOpenCardModal }) => {
  return (
    <EditIconWrapper onClick={() => setOpenCardModal(true)}>
      <StyledButton icon="pencil alternate" size="tiny" />
    </EditIconWrapper>
  );
};

export default EditCardPenIcon;
