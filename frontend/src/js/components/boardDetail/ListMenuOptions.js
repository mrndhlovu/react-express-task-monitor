import React, { Fragment } from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import { LIST_MENU_OPTIONS } from "../../constants/constants";
import UIDivider from "../shared/UIDivider";

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

const ListMenuOptions = ({ handleClick, setHeader }) => {
  return (
    <div>
      {LIST_MENU_OPTIONS.map((option) => (
        <Fragment key={option.key}>
          <DropdownItem
            onClick={() => {
              setHeader(option.value);
              handleClick(option.value);
            }}
          >
            <span>{option.value}</span>
          </DropdownItem>
          {(option.key === 2 || option.key === 4) && <UIDivider />}
        </Fragment>
      ))}
    </div>
  );
};

ListMenuOptions.propTypes = {
  setHeader: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ListMenuOptions;
