import React, { Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { stringsEqual } from "../../utils/appUtils";
import { Dropdown, Header } from "semantic-ui-react";
import UIContainer from "./UIContainer";

const Span = styled.span`
  font-size: ${(props) => props.size};
`;

const displayStyle = {
  background: "#f5f6f7",
  margin: "5px",
};

const DropdownList = ({
  list = [],
  header,
  position,
  title,
  handleSelection,
  hasList,
  hasCards,
  current,
}) => {
  const isBoardsDropdown = stringsEqual(header, "Board");
  const isListDropdown = stringsEqual(header, "List");
  const isPositionDropdown = stringsEqual(header, "Position");

  return (
    <UIContainer
      width={isBoardsDropdown ? "97%" : "150px"}
      display={displayStyle}
    >
      <Header content={header} as="h5" />
      {hasList || isBoardsDropdown ? (
        <Dropdown
          text={title || `${position === 0 ? 1 : position}`}
          pointing="left"
          icon=""
          className="link item"
        >
          <Dropdown.Menu>
            {list.map((item, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => handleSelection(item, header, index)}
              >
                <Span>
                  {isPositionDropdown ? (
                    <Fragment>
                      {hasCards ? index + 1 : "1"}
                      {current === item._id && " (current)"}
                    </Fragment>
                  ) : (
                    <Fragment>
                      {item.title}{" "}
                      {isListDropdown && current === item._id && " (current)"}
                    </Fragment>
                  )}
                </Span>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      ) : isListDropdown ? (
        "No Lists"
      ) : (
        "N/A"
      )}
    </UIContainer>
  );
};

DropdownList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({ _id: PropTypes.string.isRequired })
  ),
  header: PropTypes.string,
  position: PropTypes.number,
  title: PropTypes.string,
  handleSelection: PropTypes.func.isRequired,
  hasList: PropTypes.bool,
  hasCards: PropTypes.bool,
  current: PropTypes.string.isRequired,
};

export default DropdownList;
