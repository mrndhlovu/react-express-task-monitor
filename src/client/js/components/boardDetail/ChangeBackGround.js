import React, { useState } from "react";

import { bgColors } from "../../constants/constants";
import SideBarWrapper from "../sharedComponents/SideBarWrapper";
import UIContainer from "../sharedComponents/UIContainer";
import UIDivider from "../sharedComponents/UIDivider";
import UIWrapper from "../sharedComponents/UIWrapper";
import { stringsEqual } from "../../utils/appUtils";
import AddCoverImage from "../cardDetail/AddCoverImage";

const colorStyle = {
  borderRadius: "8px",
  height: "96px",
  marginBottom: "8px",
  width: "100%",
  cursor: "pointer",
};

const ChangeBackGround = ({
  changeBg,
  toggleChangeBg,
  handleSelectedBackground,
}) => {
  const [show, setShow] = useState("");

  return (
    <SideBarWrapper
      open={changeBg}
      handleClose={toggleChangeBg}
      header="Change board color"
      className="board-menu-sidebar"
    >
      <UIDivider inverted={true} hidden={true} />

      <UIWrapper className="bg-options-wrap">
        <UIWrapper className="bg-option" handleClick={() => setShow("colors")}>
          <span>Colors</span>
        </UIWrapper>
        <UIWrapper className="bg-option" handleClick={() => setShow("images")}>
          <span>Images</span>
        </UIWrapper>
      </UIWrapper>

      <UIDivider inverted={true} hidden={true} />
      {stringsEqual(show, "colors") && (
        <UIWrapper className="board-colors-wrap">
          {bgColors.map((color) => (
            <UIContainer padding="6px" key={color}>
              <UIWrapper
                display={{ ...colorStyle, backgroundColor: color }}
                color={color}
                handleClick={() => handleSelectedBackground(color)}
              />
            </UIContainer>
          ))}
        </UIWrapper>
      )}
      {stringsEqual(show, "images") && (
        <UIWrapper>
          <AddCoverImage handleMakeCover={handleSelectedBackground} />
        </UIWrapper>
      )}
    </SideBarWrapper>
  );
};

export default ChangeBackGround;
