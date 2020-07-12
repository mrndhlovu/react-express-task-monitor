import React, { useState } from "react";

import { Button } from "semantic-ui-react";

import { bgColors } from "../../constants/constants";
import { stringsEqual } from "../../utils/appUtils";
import AddCoverImage from "../cardDetail/AddCoverImage";
import SideBarWrapper from "../sharedComponents/SideBarWrapper";
import UIContainer from "../sharedComponents/UIContainer";
import UIDivider from "../sharedComponents/UIDivider";
import UIWrapper from "../sharedComponents/UIWrapper";

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
  const [link, setLink] = useState("");

  return (
    <SideBarWrapper
      open={changeBg}
      handleClose={toggleChangeBg}
      header={show ? `Change board ${show}` : "Change board background"}
      className="board-menu-sidebar"
    >
      <UIDivider inverted={true} hidden={true} />

      <UIWrapper className="bg-options-wrap">
        <UIWrapper className="bg-option" handleClick={() => setShow("color")}>
          <span>Colors</span>
        </UIWrapper>
        <UIWrapper className="bg-option" handleClick={() => setShow("image")}>
          <span>Images</span>
        </UIWrapper>
      </UIWrapper>

      <UIDivider inverted={true} hidden={true} />
      {stringsEqual(show, "color") && (
        <UIWrapper className="board-colors-wrap">
          {bgColors.map((color) => (
            <UIContainer padding="6px" key={color}>
              <UIWrapper
                display={{ ...colorStyle, backgroundColor: color }}
                color={color}
                handleClick={() => {
                  handleSelectedBackground(color);
                  setLink("");
                }}
              />
            </UIContainer>
          ))}
        </UIWrapper>
      )}
      {stringsEqual(show, "image") && (
        <UIWrapper>
          <AddCoverImage handleMakeCover={handleSelectedBackground} />
          <UIDivider
            content="Paste custom image link"
            inverted={true}
            hidden={false}
          />
          <input
            className="ui-textarea custom-image-link"
            placeholder="Custom image link!"
            onChange={(e) => {
              e.preventDefault();
              setLink(e.target.value);
            }}
          />
          <Button
            compact
            positive
            content="Add"
            onClick={() => handleSelectedBackground(link)}
          />
        </UIWrapper>
      )}
    </SideBarWrapper>
  );
};

export default ChangeBackGround;
