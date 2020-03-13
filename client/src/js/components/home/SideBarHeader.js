import React from "react";
import styled from "styled-components";

const MenuHeader = styled.div`
  height: 34px;
  position: relative;
  color: ${props => props.inverted && "white"};
`;

const CloseIcon = styled.span`
  font-weight: 700;
  cursor: pointer;
`;

const Header = styled.span`
  font-weight: 700;
`;

const HeadWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`;

const SideBarHeader = ({ handleClose, header = "Board", inverted }) => {
  return (
    <MenuHeader inverted={inverted}>
      <HeadWrapper>
        <CloseIcon onClick={() => handleClose()}>X</CloseIcon>
        <Header>{header}</Header>
      </HeadWrapper>
    </MenuHeader>
  );
};

export default SideBarHeader;
