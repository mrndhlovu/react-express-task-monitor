import React from "react";
import styled from "styled-components";

import { Sidebar, Menu } from "semantic-ui-react";
import SideBarHeader from "../home/SideBarHeader";

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
      <Sidebar
        as={Menu}
        animation="overlay"
        direction="right"
        inverted
        vertical
        visible={showSideBar}
        width="wide"
      >
        <SideBarHeader handleClose={handleShowMenuClick} />
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
      </Sidebar>
    </Wrapper>
  );
};

export default BoardMenu;
