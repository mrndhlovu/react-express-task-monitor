import React, { useContext } from "react";
import styled from "styled-components";

import { Sidebar, Menu } from "semantic-ui-react";

import SideBarHeader from "../home/SideBarHeader";
import { MainContext } from "../../utils/contextUtils";

const Container = styled.div`
  background-color: "#eee";
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  height: 100%;
`;

const SideBarWrapper = ({ open, handleClose, children, inverted, header }) => {
  const { mobile } = useContext(MainContext).device;

  const width = !mobile && "wide";

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
