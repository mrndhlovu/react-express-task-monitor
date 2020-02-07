import React from "react";
import styled from "styled-components";

import { bgColors } from "../../constants/constants";
import { Menu, Sidebar } from "semantic-ui-react";
import SideBarHeader from "../home/SideBarHeader";

const Container = styled.div`
  padding: 10px;
  background-color: "#eee";
`;
const ColorsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Color = styled.div`
  background-color: ${props => props.color};
  border-radius: 8px;
  height: 96px;
  margin-bottom: 8px;
  width: 100%;
  cursor: pointer;
`;

const ColorCard = styled.div`
  padding: 6px;
`;

const BackGroundColors = ({
  showColorPicker,
  handleChangeColorClick,
  handleColorPick
}) => {
  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      direction="right"
      inverted
      vertical
      visible={showColorPicker}
      width="wide"
    >
      <Container>
        <SideBarHeader handleClose={handleChangeColorClick} icon="angle left" />

        <ColorsWrapper>
          {bgColors.map(color => (
            <ColorCard key={color}>
              <Color color={color} onClick={() => handleColorPick(color)} />
            </ColorCard>
          ))}
        </ColorsWrapper>
      </Container>
    </Sidebar>
  );
};

export default BackGroundColors;
