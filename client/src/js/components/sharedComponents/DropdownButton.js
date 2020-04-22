import React, { useState, Fragment } from "react";
import styled from "styled-components";

import { Header, Dropdown, Divider, Icon } from "semantic-ui-react";

const StyledDropdown = styled(Dropdown)`
  margin-bottom: 10px !important;
  padding-bottom: 15px;
  background: ${(props) => props.color} !important;
  text-align: left !important;
  font-size: 13px !important;
  font-weight: 500 !important;
`;

const HeaderWrapper = styled(Dropdown.Header)`
  display: flex !important;
  justify-content: space-between !important;
  flex-direction: row !important;
  width: 100% !important;
`;

const DropdownButton = ({
  buttonText,
  children,
  icon,
  header,
  color = "#091e420a",
  size = "tiny",
  fluid = true,
  labeled = true,
  button = true,
  direction = "left",
  upward = false,
  as = "h5",
  callback = () => {},
  closeOnSelect = false,
  hasHeader = true,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = (callback) => {
    setOpen(!open);
    return callback();
  };

  return (
    <StyledDropdown
      upward={upward}
      lazyLoad
      button={button}
      className="icon"
      color={color}
      compact
      floating
      fluid={fluid}
      icon={icon}
      labeled={labeled}
      onClick={() => setOpen(!open)}
      open={open}
      size={size}
      text={buttonText}
      direction={direction}
    >
      <Dropdown.Menu
        className="sidebar-dropdown-button"
        onClick={(e) => !closeOnSelect && e.stopPropagation()}
      >
        {hasHeader && (
          <Fragment>
            <HeaderWrapper>
              <Header size="tiny" as={as} content={header} />
              <Icon link name="close" onClick={() => handleClose(callback)} />
            </HeaderWrapper>
            <Divider />
          </Fragment>
        )}

        {children}
      </Dropdown.Menu>
    </StyledDropdown>
  );
};

export default DropdownButton;
