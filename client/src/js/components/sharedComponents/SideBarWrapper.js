import React from "react";
import styled from "styled-components";

import { Sidebar, Menu } from "semantic-ui-react";

import SideBarHeader from "../home/SideBarHeader";

const Container = styled.div`
  padding: 10px;
  background-color: "#eee";
`;

const SideBarWrapper = ({
  open,
  handleClose,
  children,
  inverted,
  header,
  width = "wide"
}) => {
  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      direction="right"
      vertical
      inverted={inverted}
      visible={open}
      width={width}
    >
      <Container>
        <SideBarHeader
          handleClose={handleClose}
          icon="angle left"
          header={header}
          inverted={inverted}
        />

        {children}
      </Container>
    </Sidebar>
  );
};

export default SideBarWrapper;
