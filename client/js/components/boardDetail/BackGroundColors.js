import React from "react";

import { bgColors } from "../../constants/constants";
import SideBarWrapper from "../sharedComponents/SideBarWrapper";
import UIContainer from "../sharedComponents/UIContainer";
import UIDivider from "../sharedComponents/UIDivider";
import UIWrapper from "../sharedComponents/UIWrapper";

const wrapperStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  padding: 0,
};

const colorStyle = {
  borderRadius: "8px",
  height: "96px",
  marginBottom: "8px",
  width: "100%",
  cursor: "pointer",
};

const BackGroundColors = ({
  showColorPicker,
  handleChangeColorClick,
  handleColorPick,
}) => {
  return (
    <SideBarWrapper
      open={showColorPicker}
      handleClose={handleChangeColorClick}
      header="Change board color"
      className="board-menu-sidebar"
    >
      <UIDivider hidden={true} />
      <UIWrapper display={wrapperStyle}>
        {bgColors.map((color) => (
          <UIContainer padding="6px" key={color}>
            <UIWrapper
              display={{ ...colorStyle, backgroundColor: color }}
              color={color}
              onClick={() => handleColorPick(color)}
            />
          </UIContainer>
        ))}
      </UIWrapper>
    </SideBarWrapper>
  );
};

export default BackGroundColors;
