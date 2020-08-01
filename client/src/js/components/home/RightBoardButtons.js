import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import NavButton from "../sharedComponents/NavButton";

const StyledDiv = styled.div`
  padding-right: 4px;
  justify-self: ${(props) => (props.mobile ? "start" : "end")};
`;

const RightBoardButtons = ({ handleShowMenuClick, mobile }) => {
  return (
    <StyledDiv mobile={mobile}>
      <NavButton
        iconName="ellipsis horizontal"
        size="tiny"
        buttonText="Show Menu"
        redirect={() => handleShowMenuClick()}
        forceText={true}
      />
    </StyledDiv>
  );
};

RightBoardButtons.propTypes = {
  handleShowMenuClick: PropTypes.func.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default RightBoardButtons;
