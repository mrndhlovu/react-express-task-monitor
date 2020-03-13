import React from "react";
import styled from "styled-components";

import { Menu } from "semantic-ui-react";
import SideBarWrapper from "../sharedComponents/SideBarWrapper";

const Wrapper = styled.div`
  width: 800px;
`;

const BoardMenu = ({
  handleChangeColorClick,
  handleShowMenuClick,
  showSideBar,
  handleDeleteBoard
}) => {
  return (
    <Wrapper>
      <SideBarWrapper
        handleClose={handleShowMenuClick}
        inverted={true}
        open={showSideBar}
      >
        <Menu.Item color="grey" as="a">
          About This Board
        </Menu.Item>
        <Menu.Item as="a" onClick={() => handleChangeColorClick()}>
          Change Background
        </Menu.Item>
        <Menu.Item as="a">Search Cards</Menu.Item>
        <Menu.Item as="a" onClick={() => handleDeleteBoard()}>
          Delete board
        </Menu.Item>
      </SideBarWrapper>
    </Wrapper>
  );
};

export default BoardMenu;
