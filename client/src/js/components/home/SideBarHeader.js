import React from "react";
import styled from "styled-components";

import { Icon } from "semantic-ui-react";

const IconWrapper = styled.div`
  justify-self: end;
  align-self: center;
  padding-right: 10px;
  cursor: pointer;
`;

const MenuHeader = styled.div`
  color: white;
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 10px;
`;

const SideBarHeader = ({ handleClose, icon }) => {
  return (
    <MenuHeader>
      <Icon name={icon} size="large" onClick={() => handleClose()} />
      <IconWrapper>
        <Icon as="i" name="close" onClick={() => handleClose()} />
      </IconWrapper>
    </MenuHeader>
  );
};

export default SideBarHeader;
