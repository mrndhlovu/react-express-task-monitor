import React, { useState, Fragment, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Header, Dropdown, Icon } from "semantic-ui-react";
import { X } from "react-feather";
import UIDivider from "./UIDivider";

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
  as = "h5",
  button = true,
  buttonText,
  callback = () => {},
  children,
  className,
  close,
  closeOnSelect = false,
  color,
  compact = true,
  direction = "left",
  fluid = true,
  hasHeader = true,
  header,
  icon,
  iconColor,
  labeled = true,
  notificationCount,
  pointing,
  size = "tiny",
  upward = false,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = (callback) => {
    callback && callback();
    return setOpen(false);
  };

  useEffect(() => {
    close && handleClose();
  }, [close]);

  return (
    <StyledDropdown
      upward={upward}
      lazyLoad
      button={button}
      className={`${className || ""} icon`}
      color={color}
      compact={compact}
      floating
      fluid={fluid}
      icon={
        icon && (
          <>
            {notificationCount && (
              <span className="notifications-count">{notificationCount}</span>
            )}
            <Icon name={icon} color={iconColor} />
          </>
        )
      }
      labeled={labeled}
      onClick={() => setOpen(true)}
      open={open}
      size={size}
      text={buttonText}
      direction={direction}
      pointing={pointing}
      onBlur={() => (closeOnSelect ? handleClose(callback) : () => {})}
    >
      <Dropdown.Menu
        className="sidebar-dropdown-button"
        onClick={(e) => !closeOnSelect && e.stopPropagation()}
      >
        {hasHeader && (
          <Fragment>
            <HeaderWrapper>
              <Header size="small" as={as} content={header} />
              {!closeOnSelect && <X onClick={() => handleClose(callback)} />}
            </HeaderWrapper>
            <UIDivider />
          </Fragment>
        )}
        {children}
      </Dropdown.Menu>
    </StyledDropdown>
  );
};

DropdownButton.propTypes = {
  as: PropTypes.string,
  button: PropTypes.bool,
  buttonText: PropTypes.string,
  callback: PropTypes.func,
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  close: PropTypes.bool,
  closeOnSelect: PropTypes.bool,
  color: PropTypes.string,
  compact: PropTypes.bool,
  direction: PropTypes.string,
  fluid: PropTypes.bool,
  hasHeader: PropTypes.bool,
  header: PropTypes.string,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  labeled: PropTypes.bool,
  notificationCount: PropTypes.bool,
  pointing: PropTypes.string,
  size: PropTypes.string,
  upward: PropTypes.bool,
};

export default DropdownButton;
