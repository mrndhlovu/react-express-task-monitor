import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Edit2 } from "react-feather";

const EditIconWrapper = styled.div`
  background: #e4e4e4;
  border-radius: 3px;
  cursor: pointer;
  font-size: 13px;
  margin-right: 5px;
  margin-top: 3px;
  position: absolute;
  right: 0;
  top: 4px;
  width: 25px;
  height: 25px;
`;

const StyledButton = styled(Edit2)`
  padding: 5px !important;
`;

const EditCardPenIcon = ({ setOpenCardModal }) => {
  return (
    <EditIconWrapper onClick={() => setOpenCardModal(true)}>
      <StyledButton />
    </EditIconWrapper>
  );
};

EditCardPenIcon.propTypes = {
  setOpenCardModal: PropTypes.func.isRequired,
};

export default EditCardPenIcon;
