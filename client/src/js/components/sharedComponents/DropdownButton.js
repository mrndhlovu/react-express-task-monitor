import React, { useState } from "react";
import styled from "styled-components";

import { Header, Dropdown, Divider, Icon } from "semantic-ui-react";

const StyledDropdown = styled(Dropdown)`
  margin-bottom: 10px !important;
  padding-bottom: 15px;
  background-color: ${props => (props.color ? props.color : "#091e420a")};
  text-align: left !important;
  font-size: 13px !important;
  font-weight: 500 !important;
`;

const HeaderWrapper = styled(Dropdown.Header)`
  align-items: center;
  display: grid;
  grid-template-columns: 90% 10%;
  width: 100%;
`;

const DropdownButton = ({
  buttonText,
  children,
  icon,
  header,
  color,
  size = "tiny",
  fluid = true,
  labeled = true,
  button = true,
  direction = "left",
  upward = false,
  as = "h5"
}) => {
  const [open, setOpen] = useState(false);
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
        onClick={e => e.stopPropagation()}
      >
        <HeaderWrapper>
          <div>
            <Header size="tiny" as={as} content={header} />
          </div>
          <div>
            <Icon link name="close" onClick={() => setOpen(!open)} />
          </div>
        </HeaderWrapper>
        <Divider />
        {children}
      </Dropdown.Menu>
    </StyledDropdown>
  );
};

export default DropdownButton;
