import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { X } from "react-feather";

import UIContainer from "../shared/UIContainer";

const Header = styled.span`
  font-weight: 700;
`;

const HeadWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SideBarHeader = ({ handleClose, header }) => {
  return (
    <UIContainer>
      <HeadWrapper>
        <X name="close" onClick={() => handleClose()} />
        <Header>{header}</Header>
      </HeadWrapper>
    </UIContainer>
  );
};

SideBarHeader.defaultProps = {
  header: "Board",
};

SideBarHeader.propTypes = {
  handleClose: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
};

export default SideBarHeader;
