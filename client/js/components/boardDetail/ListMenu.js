import React, { Fragment } from "react";

import { Divider } from "semantic-ui-react";
import styled from "styled-components";
import { listMenuOptions } from "../../constants/constants";

const DropdownItem = styled.li`
  font-size: 15px !important;
  cursor: pointer;
  list-style-type: none;
  padding: 8px 8px;
  border-radius: 3px;

  &:hover {
    background-color: #ebecf0;
  }
`;

const ListMenu = ({
  handleShowCopyListClick,
  handleShowMoveListClick,
  handleDeleteListClick,
  handleMoveCardsClick,
  handleDeleteAllClick,
  setHeader,
}) => {
  const handleMenuClick = (key) => {
    switch (key) {
      case "menu-item-1":
        handleShowMoveListClick();
        break;
      case "menu-item-2":
        handleShowCopyListClick();
        break;
      case "menu-item-3":
        handleMoveCardsClick();
        break;
      case "menu-item-4":
        handleDeleteAllClick();
        break;
      case "menu-item-5":
        handleDeleteListClick();
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {listMenuOptions.map((option) => (
        <Fragment key={option.key}>
          <DropdownItem
            onClick={() => {
              setHeader(option.value);
              handleMenuClick(`menu-item-${option.key}`);
            }}
          >
            <span>{option.value}</span>
          </DropdownItem>
          {(option.key === 2 || option.key === 4) && <Divider />}
        </Fragment>
      ))}
    </div>
  );
};

export default ListMenu;
