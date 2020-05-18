import React from "react";

import { Sidebar, Menu } from "semantic-ui-react";

import SideBarHeader from "../home/SideBarHeader";
import UIContainer from "./UIContainer";

const SideBarWrapper = ({
  open,
  handleClose,
  children,
  inverted = true,
  header,
  className,
  direction = "right",
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
      visible={open}
      onHide={onHide}
      className={className}
    >
      <UIContainer>
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
