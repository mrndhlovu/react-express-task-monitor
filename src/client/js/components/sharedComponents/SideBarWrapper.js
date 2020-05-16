import React from "react";

import { Sidebar, Menu } from "semantic-ui-react";

import SideBarHeader from "../home/SideBarHeader";
import UIContainer from "./UIContainer";

const defaultStyles = {
  backgroundColor: "#eee",
  display: "flex",
  flexDirection: "column",
  padding: "10px",
  width: "100%",
  height: "100%",
};

const SideBarWrapper = ({
  open,
  handleClose,
  children,
  inverted,
  header,
  className,
  direction = "right",
  style,
  hasHeader = true,
  icon,
  onHide,
}) => {
  return (
    <Sidebar
      icon={icon}
      as={Menu}
      animation="overlay"
      direction={direction}
      vertical
      inverted={inverted}
      visible={open}
      onHide={onHide}
      className={`${className} ui-sidebar`}
    >
      <UIContainer display={style ? style : defaultStyles}>
        {hasHeader && (
          <SideBarHeader
            handleClose={handleClose}
            icon="angle left"
            header={header}
            inverted={inverted}
          />
        )}
        {children}
      </UIContainer>
    </Sidebar>
  );
};

export default SideBarWrapper;
