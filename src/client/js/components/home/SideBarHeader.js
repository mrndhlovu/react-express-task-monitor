import React from "react";
import styled from "styled-components";

import { Icon } from "semantic-ui-react";

import UIContainer from "../sharedComponents/UIContainer";

const Header = styled.span`
  font-weight: 700;
`;

const HeadWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SideBarHeader = ({ handleClose, header = "Board" }) => {
  return (
    <UIContainer>
      <HeadWrapper>
        <Icon name="close" onClick={() => handleClose()} />
        <Header>{header}</Header>
      </HeadWrapper>
    </UIContainer>
  );
};

export default SideBarHeader;
