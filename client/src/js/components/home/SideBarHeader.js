import React from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";

const MenuHeader = styled.div`
  height: 34px;
  color: ${(props) => props.inverted && "white"};
  position: fixed;
  width: 90%;
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
        <Icon name="close" onClick={() => handleClose()} />
        <Header>{header}</Header>
      </HeadWrapper>
    </MenuHeader>
  );
};

export default SideBarHeader;
