import React from "react";
import styled from "styled-components";

import { bgColors } from "../../constants/constants";
import SideBarWrapper from "../sharedComponents/SideBarWrapper";
import { Divider } from "semantic-ui-react";

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
    <SideBarWrapper
      open={showColorPicker}
      handleClose={handleChangeColorClick}
      header="Change board color"
    >
      <Divider hidden />
      <ColorsWrapper>
        {bgColors.map(color => (
          <ColorCard key={color}>
            <Color color={color} onClick={() => handleColorPick(color)} />
          </ColorCard>
        ))}
      </ColorsWrapper>
    </SideBarWrapper>
  );
};

export default BackGroundColors;
