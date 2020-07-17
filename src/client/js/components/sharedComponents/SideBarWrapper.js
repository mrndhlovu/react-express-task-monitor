import React from "react";
import PropTypes from "prop-types";

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

SideBarWrapper.propTypes = {
  className: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  hasHeader: PropTypes.bool,
  header: PropTypes.string,
  icon: PropTypes.string.isRequired,
  inverted: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default SideBarWrapper;
