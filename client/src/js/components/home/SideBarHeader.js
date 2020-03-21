import React from "react";
import styled from "styled-components";

const MenuHeader = styled.div`
  height: 34px;
  color: ${props => props.inverted && "white"};
  position: fixed;
  width: 95%;
`;

const CloseIcon = styled.span`
  font-weight: 700;
  cursor: pointer;
`;

const Header = styled.span`
  font-weight: 700;
`;

const HeadWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
