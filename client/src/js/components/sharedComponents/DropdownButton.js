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

const DropdownButton = ({ buttonText, children, icon, header, color }) => {
  const [open, setOpen] = useState(false);
  return (
    <StyledDropdown
      button
      className="icon"
      compact
      floating
      fluid
      icon={icon}
      labeled
      text={buttonText}
      open={open}
      onClick={() => setOpen(!open)}
      color={color}
    >
      <Dropdown.Menu
        className="sidebar-dropdown-button"
        onClick={e => e.stopPropagation()}
      >
        <HeaderWrapper>
          <div>
            <Header size="tiny" as="h5" content={header} />
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
