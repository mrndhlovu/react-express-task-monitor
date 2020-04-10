import React from "react";
import styled from "styled-components";

import { Dropdown, Header } from "semantic-ui-react";
import { getStringEquality } from "../../utils/appUtils";
import UIContainer from "./UIContainer";

const Span = styled.span``;

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
}) => {
  const isBoardsDropdown = getStringEquality(header, "Board");
  const isListDropdown = getStringEquality(header, "List");
  const isPositionDropdown = getStringEquality(header, "Position");

  return (
    <UIContainer
      width={isBoardsDropdown ? "97%" : "150px"}
      display={displayStyle}
    >
      <Header content={header} as="h5" />
      {hasList || isBoardsDropdown ? (
        <Dropdown
          text={title || `${position}`}
          pointing="left"
          icon=""
          className="link item"
        >
          <Dropdown.Menu>
            {list.map((item, index) => (
              <Dropdown.Item
                key={index}
                onClick={() =>
                  handleSelection(
                    isPositionDropdown || isListDropdown ? index + 1 : item,
                    header
                  )
                }
              >
                {isPositionDropdown ? (
                  <Span>{index ? index + 1 : 1}</Span>
                ) : (
                  <Span>{item.title}</Span>
                )}
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

export default DropdownList;
